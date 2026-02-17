
import { POST } from '@/app/api/vision/route';

// Mock request
function createRequest(body: any) {
  return new Request('http://localhost:3000/api/vision', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

describe('Vision API Validation', () => {
  test('should return 400 when description is missing', async () => {
    const req = createRequest({});
    const res = await POST(req);
    const data = await res.json();

    // Assert status is 400
    if (res.status !== 400) {
        throw new Error(`Expected status 400, got ${res.status}`);
    }

    // Assert error message
    if (data.error !== 'Invalid vision request') {
        throw new Error(`Expected error 'Invalid vision request', got '${data.error}'`);
    }
  });

  test('should return 400 when description is not a string', async () => {
    const req = createRequest({ description: 123 });
    const res = await POST(req);
    const data = await res.json();

    // Assert status is 400
    if (res.status !== 400) {
        throw new Error(`Expected status 400, got ${res.status}`);
    }

    // Assert error message
    if (data.error !== 'Invalid vision request') {
        throw new Error(`Expected error 'Invalid vision request', got '${data.error}'`);
    }
  });

  test('should return 400 when description is empty string', async () => {
    const req = createRequest({ description: "" });
    const res = await POST(req);
    const data = await res.json();

    // Assert status is 400
    if (res.status !== 400) {
        throw new Error(`Expected status 400, got ${res.status}`);
    }

    if (data.error !== 'Invalid vision request') {
        throw new Error(`Expected error 'Invalid vision request', got '${data.error}'`);
    }
  });

  test('should return 200 when description is valid', async () => {
    const req = createRequest({ description: "A happy song about coding" });
    const res = await POST(req);
    const data = await res.json();

    if (res.status !== 200) {
        throw new Error(`Expected status 200, got ${res.status}`);
    }

    if (!data.prompt) {
        throw new Error('Expected prompt in response');
    }
  });
});
