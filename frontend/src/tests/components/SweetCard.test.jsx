import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthContext';
import SweetCard from '../../components/SweetCard';

// Mock the useAuth hook
const mockUseAuth = {
  isAdmin: jest.fn(() => false),
};

jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => mockUseAuth,
}));

describe('SweetCard', () => {
  const mockSweet = {
    _id: '1',
    name: 'Chocolate Bar',
    category: 'Chocolate',
    price: 2.50,
    quantity: 10,
    description: 'Delicious milk chocolate'
  };

  const mockOnPurchase = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnRestock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.isAdmin.mockReturnValue(false);
  });

  const renderSweetCard = (props = {}) => {
    return render(
      <AuthProvider>
        <SweetCard
          sweet={mockSweet}
          onPurchase={mockOnPurchase}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRestock={mockOnRestock}
          {...props}
        />
      </AuthProvider>
    );
  };

  it('should render sweet information', () => {
    renderSweetCard();
    
    expect(screen.getByText('Chocolate Bar')).toBeInTheDocument();
    expect(screen.getByText('$2.50')).toBeInTheDocument();
    expect(screen.getByText('Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Stock: 10')).toBeInTheDocument();
    expect(screen.getByText('Delicious milk chocolate')).toBeInTheDocument();
  });

  it('should show purchase button for regular users', () => {
    renderSweetCard();
    
    expect(screen.getByText('Purchase')).toBeInTheDocument();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should show admin controls for admin users', () => {
    mockUseAuth.isAdmin.mockReturnValue(true);
    renderSweetCard();
    
    expect(screen.getByText('Purchase')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Restock')).toBeInTheDocument();
  });

  it('should call onPurchase when purchase button is clicked', async () => {
    mockOnPurchase.mockResolvedValue();
    renderSweetCard();
    
    const purchaseButton = screen.getByText('Purchase');
    fireEvent.click(purchaseButton);
    
    await waitFor(() => {
      expect(mockOnPurchase).toHaveBeenCalledWith(mockSweet._id, 1);
    });
  });

  it('should disable purchase button when out of stock', () => {
    const outOfStockSweet = { ...mockSweet, quantity: 0 };
    renderSweetCard({ sweet: outOfStockSweet });
    
    const purchaseButton = screen.getByText('Out of Stock');
    expect(purchaseButton).toBeDisabled();
    expect(screen.getByText('(Out of Stock)')).toBeInTheDocument();
  });

  it('should allow quantity selection for purchase', () => {
    renderSweetCard();
    
    const quantityInput = screen.getAllByDisplayValue('1')[0];
    fireEvent.change(quantityInput, { target: { value: '3' } });
    
    expect(quantityInput.value).toBe('3');
  });

  it('should call onEdit when edit button is clicked (admin)', () => {
    mockUseAuth.isAdmin.mockReturnValue(true);
    renderSweetCard();
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockSweet);
  });

  it('should call onDelete when delete button is clicked (admin)', () => {
    mockUseAuth.isAdmin.mockReturnValue(true);
    renderSweetCard();
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockSweet._id);
  });

  it('should call onRestock when restock button is clicked (admin)', async () => {
    mockUseAuth.isAdmin.mockReturnValue(true);
    mockOnRestock.mockResolvedValue();
    renderSweetCard();
    
    const restockButton = screen.getByText('Restock');
    fireEvent.click(restockButton);
    
    await waitFor(() => {
      expect(mockOnRestock).toHaveBeenCalledWith(mockSweet._id, 1);
    });
  });

  it('should format price correctly', () => {
    const sweetWithDifferentPrice = { ...mockSweet, price: 12.99 };
    renderSweetCard({ sweet: sweetWithDifferentPrice });
    
    expect(screen.getByText('$12.99')).toBeInTheDocument();
  });

  it('should show loading state during purchase', async () => {
    mockOnPurchase.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    renderSweetCard();
    
    const purchaseButton = screen.getByText('Purchase');
    fireEvent.click(purchaseButton);
    
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Purchase')).toBeInTheDocument();
    });
  });

  it('should prevent purchase when quantity exceeds stock', () => {
    renderSweetCard();
    
    const quantityInput = screen.getAllByDisplayValue('1')[0];
    fireEvent.change(quantityInput, { target: { value: '15' } });
    
    const purchaseButton = screen.getByText('Purchase');
    expect(purchaseButton).toBeDisabled();
  });

  it('should show sweet emoji when no image URL provided', () => {
    renderSweetCard();
    
    expect(screen.getByText('🍬')).toBeInTheDocument();
  });
});