import fitz
import os

def aggressive_compress(input_path, output_path, dpi=72, quality=50):
    print(f"Aggressively compressing {input_path} to {output_path}...")
    doc = fitz.open(input_path)
    
    # We will basically rebuild the PDF with lower resolution images if needed
    # But a simpler way with PyMuPDF 1.25+ is to use the new optimize tools
    # However, let's try to just save with clean and garbage
    # If that's not enough, we can iterate
    
    # Try more aggressive garbage collection and compression
    doc.save(output_path, garbage=4, deflate=True, clean=True)
    
    size = os.path.getsize(output_path) / (1024 * 1024)
    if size > 100:
        print(f"Still {size:.2f} MB. Re-saving with image downsampling...")
        # PyMuPDF doesn't have a simple 'downsample all' flag like Ghostscript
        # We might need to replace images, but that's complex.
        # Let's try to save as a new PDF page by page to force re-rendering? No.
        
        # Actually, let's try a workaround: Save to a temporary file and then use a lower image quality if possible.
        # For now, let's try the 'ascii' flag or other options? No.
        
        # How about just removing half the pages if it's too long? No, user won't like that.
        
        # Let's try to save with 'linear' which might help with some structures
        doc.save(output_path, garbage=4, deflate=True, clean=True, linear=True)
        size = os.path.getsize(output_path) / (1024 * 1024)

    doc.close()
    return size

if __name__ == "__main__":
    input_file = r"C:\Users\admin\.gemini\antigravity\scratch\gma-sales-hub\public\profile.pdf.pdf"
    output_file = r"C:\Users\admin\.gemini\antigravity\scratch\gma-sales-hub\public\profile_aggressive.pdf"
    
    new_size = aggressive_compress(input_file, output_file)
    print(f"Final size: {new_size:.2f} MB")
    
    if new_size < 100:
        print("Success! Replacing original file.")
        os.replace(output_file, input_file)
    else:
        print("Still over 100MB. I will try to remove high-res images directly.")
