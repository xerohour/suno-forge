from playwright.sync_api import sync_playwright

def verify_studio_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            page.goto("http://localhost:3000/studio")

            # Wait for content to load
            page.wait_for_selector("header")

            # Capture screenshot
            page.screenshot(path="studio_verification.png")
            print("✅ Screenshot captured at studio_verification.png")

        except Exception as e:
            print(f"❌ Verification failed: {e}")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_studio_screenshot()
