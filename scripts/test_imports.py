import sys

def test_import(module_name):
    print(f"Importing {module_name}...", end="")
    sys.stdout.flush()
    try:
        __import__(module_name)
        print(" Success!")
    except Exception as e:
        print(f" Failed: {e}")
    sys.stdout.flush()

test_import("PIL")
test_import("numpy")
test_import("scipy")
test_import("onnxruntime")
test_import("pymatting")
test_import("rembg")
print("All imports tested.")
