import axios from 'axios';
import { authAPI, sweetAPI } from '../../services/api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock window.location
delete window.location;
window.location = { href: '' };

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('mock-token');
  });

  describe('Auth API', () => {
    describe('register', () => {
      it('should make POST request to register endpoint', async () => {
        const userData = {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        };
        
        const mockResponse = {
          data: {
            success: true,
            token: 'mock-token',
            user: { id: '1', username: 'testuser', email: 'test@example.com' }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          post: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await authAPI.register(userData);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('login', () => {
      it('should make POST request to login endpoint', async () => {
        const credentials = {
          email: 'test@example.com',
          password: 'password123'
        };
        
        const mockResponse = {
          data: {
            success: true,
            token: 'mock-token',
            user: { id: '1', username: 'testuser', email: 'test@example.com' }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          post: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await authAPI.login(credentials);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('getProfile', () => {
      it('should make GET request to profile endpoint', async () => {
        const mockResponse = {
          data: {
            success: true,
            user: { id: '1', username: 'testuser', email: 'test@example.com' }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          get: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await authAPI.getProfile();
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });
  });

  describe('Sweet API', () => {
    describe('getAll', () => {
      it('should make GET request to sweets endpoint', async () => {
        const mockResponse = {
          data: {
            success: true,
            data: [
              { id: '1', name: 'Chocolate Bar', price: 2.50 },
              { id: '2', name: 'Gummy Bears', price: 1.50 }
            ]
          }
        };
        
        mockedAxios.create.mockReturnValue({
          get: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.getAll();
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('getById', () => {
      it('should make GET request to specific sweet endpoint', async () => {
        const sweetId = '123';
        const mockResponse = {
          data: {
            success: true,
            data: { id: sweetId, name: 'Chocolate Bar', price: 2.50 }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          get: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.getById(sweetId);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('search', () => {
      it('should make GET request to search endpoint with params', async () => {
        const searchParams = { name: 'chocolate', category: 'Chocolate' };
        const mockResponse = {
          data: {
            success: true,
            data: [{ id: '1', name: 'Chocolate Bar', category: 'Chocolate' }]
          }
        };
        
        mockedAxios.create.mockReturnValue({
          get: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.search(searchParams);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('create', () => {
      it('should make POST request to create sweet', async () => {
        const sweetData = {
          name: 'New Sweet',
          category: 'Candy',
          price: 3.00,
          quantity: 20
        };
        
        const mockResponse = {
          data: {
            success: true,
            data: { id: '123', ...sweetData }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          post: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.create(sweetData);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('update', () => {
      it('should make PUT request to update sweet', async () => {
        const sweetId = '123';
        const sweetData = {
          name: 'Updated Sweet',
          price: 3.50
        };
        
        const mockResponse = {
          data: {
            success: true,
            data: { id: sweetId, ...sweetData }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          put: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.update(sweetId, sweetData);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('delete', () => {
      it('should make DELETE request to remove sweet', async () => {
        const sweetId = '123';
        const mockResponse = {
          data: {
            success: true,
            message: 'Sweet deleted successfully'
          }
        };
        
        mockedAxios.create.mockReturnValue({
          delete: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.delete(sweetId);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('purchase', () => {
      it('should make POST request to purchase sweet with default quantity', async () => {
        const sweetId = '123';
        const mockResponse = {
          data: {
            success: true,
            message: 'Purchase successful',
            data: { remainingStock: 9 }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          post: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.purchase(sweetId);
        
        expect(result.data).toEqual(mockResponse.data);
      });

      it('should make POST request to purchase sweet with specified quantity', async () => {
        const sweetId = '123';
        const quantity = 3;
        const mockResponse = {
          data: {
            success: true,
            message: 'Purchase successful',
            data: { remainingStock: 7 }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          post: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.purchase(sweetId, quantity);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });

    describe('restock', () => {
      it('should make POST request to restock sweet', async () => {
        const sweetId = '123';
        const quantity = 10;
        const mockResponse = {
          data: {
            success: true,
            message: 'Restock successful',
            data: { newStock: 20 }
          }
        };
        
        mockedAxios.create.mockReturnValue({
          post: jest.fn().mockResolvedValue(mockResponse),
          interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
          }
        });
        
        const result = await sweetAPI.restock(sweetId, quantity);
        
        expect(result.data).toEqual(mockResponse.data);
      });
    });
  });
});