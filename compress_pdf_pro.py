import fitz
import os
from PIL import Image
import io

def compress_pdf_with_pillow(input_path, output_path, max_dim=1200, quality=60):
    print(f"Opening {input_path} for deep compression with Pillow...")
    doc = fitz.open(input_path)
    
    # Iterate through all objects to find images
    for xref in range(1, doc.xref_length()):
        if doc.xref_get_keys(xref) and "Subtype" in doc.xref_get_keys(xref):
            if doc.xref_get_key(xref, "Subtype")[1] == "/Image":
                try:
                    # Get pixmap
                    pix = fitz.Pixmap(doc, xref)
                    
                    # Determine image mode
                    if pix.colorspace:
                        if pix.colorspace.n > 3:
                            pix = fitz.Pixmap(fitz.csRGB, pix)
                        
                        # Convert to PIL Image
                        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                        
                        # Resize if larger than max_dim
                        if max(img.size) > max_dim:
                            img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                        
                        # Compress to bytes
                        buffer = io.BytesIO()
                        img.save(buffer, format="JPEG", quality=quality, optimize=True)
                        img_data = buffer.getvalue()
                        
                        # Replace stream
                        doc.update_stream(xref, img_data)
                        doc.xref_set_key(xref, "Filter", "/DCTDecode")
                        doc.xref_set_key(xref, "ColorSpace", "/DeviceRGB")
                except Exception as e:
                    pass
                finally:
                    pix = None

    print(f"Saving to {output_path}...")
    doc.save(output_path, garbage=4, deflate=True, clean=True)
    doc.close()
    
    in_size = os.path.getsize(input_path) / (1024 * 1024)
    out_size = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Original: {in_size:.2f} MB")
    print(f"Compressed: {out_size:.2f} MB")
    return out_size

if __name__ == "__main__":
    input_file = r"C:\Users\admin\.gemini\antigravity\scratch\gma-sales-hub\public\profile.pdf.pdf"
    output_temp = r"C:\Users\admin\.gemini\antigravity\scratch\gma-sales-hub\public\profile_min.pdf"
    
    final_size = compress_pdf_with_pillow(input_file, output_temp)
    
    if final_size < 99:
        print("Success! Target reached.")
        os.replace(output_temp, input_file)
    else:
        print("Still over 100MB. Reducing quality further...")
        compress_pdf_with_pillow(input_file, output_temp, max_dim=800, quality=40)
        final_size_v2 = os.path.getsize(output_temp) / (1024 * 1024)
        print(f"Final Attempt Size: {final_size_v2:.2f} MB")
        if final_size_v2 < 100:
            os.replace(output_temp, input_file)
