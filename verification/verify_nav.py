from playwright.sync_api import Page, expect, sync_playwright

def test_vision_nav(page: Page):
  page.goto("http://localhost:3000/vision")
  nav = page.locator("nav")
  expect(nav).to_be_visible()

  print(f"Computed bottom: {nav.evaluate('element => window.getComputedStyle(element).bottom')}")

  page.screenshot(path="verification/vision-nav-final.png", full_page=True)

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    test_vision_nav(page)
