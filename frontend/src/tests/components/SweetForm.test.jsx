import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SweetForm from '../../components/SweetForm';

describe('SweetForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSweetForm = (props = {}) => {
    return render(
      <SweetForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        loading={false}
        {...props}
      />
    );
  };

  it('should render all form fields', () => {
    renderSweetForm();
    
    expect(screen.getByLabelText(/sweet name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
  });

  it('should render create button when no sweet provided', () => {
    renderSweetForm();
    
    expect(screen.getByText('Create Sweet')).toBeInTheDocument();
  });

  it('should render update button when sweet provided', () => {
    const sweet = {
      name: 'Test Sweet',
      category: 'Chocolate',
      price: 2.50,
      quantity: 10
    };
    
    renderSweetForm({ sweet });
    
    expect(screen.getByText('Update Sweet')).toBeInTheDocument();
  });

  it('should populate form fields when editing sweet', () => {
    const sweet = {
      name: 'Test Sweet',
      category: 'Chocolate',
      price: 2.50,
      quantity: 10,
      description: 'Test description',
      imageUrl: 'https://example.com/image.jpg'
    };
    
    renderSweetForm({ sweet });
    
    expect(screen.getByDisplayValue('Test Sweet')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Chocolate')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com/image.jpg')).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    renderSweetForm();
    
    const submitButton = screen.getByText('Create Sweet');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Sweet name is required')).toBeInTheDocument();
      expect(screen.getByText('Price is required')).toBeInTheDocument();
      expect(screen.getByText('Quantity is required')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate price is positive', async () => {
    renderSweetForm();
    
    fireEvent.change(screen.getByLabelText(/sweet name/i), { target: { value: 'Test Sweet' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '-1' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '10' } });
    
    const submitButton = screen.getByText('Create Sweet');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Price must be a positive number')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate quantity is non-negative integer', async () => {
    renderSweetForm();
    
    fireEvent.change(screen.getByLabelText(/sweet name/i), { target: { value: 'Test Sweet' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '2.50' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '5.5' } });
    
    const submitButton = screen.getByText('Create Sweet');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Quantity must be a non-negative integer')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate name length', async () => {
    renderSweetForm();
    
    const longName = 'A'.repeat(101);
    fireEvent.change(screen.getByLabelText(/sweet name/i), { target: { value: longName } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '2.50' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '10' } });
    
    const submitButton = screen.getByText('Create Sweet');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Sweet name cannot exceed 100 characters')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate description length', async () => {
    renderSweetForm();
    
    const longDescription = 'A'.repeat(501);
    fireEvent.change(screen.getByLabelText(/sweet name/i), { target: { value: 'Test Sweet' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '2.50' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: longDescription } });
    
    const submitButton = screen.getByText('Create Sweet');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Description cannot exceed 500 characters')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate image URL format', async () => {
    renderSweetForm();
    
    fireEvent.change(screen.getByLabelText(/sweet name/i), { target: { value: 'Test Sweet' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '2.50' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: 'invalid-url' } });
    
    const submitButton = screen.getByText('Create Sweet');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid URL')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    renderSweetForm();
    
    fireEvent.change(screen.getByLabelText(/sweet name/i), { target: { value: 'Test Sweet' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Candy' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '2.50' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test description' } });
    
    const submitButton = screen.getByText('Create Sweet');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Test Sweet',
        category: 'Candy',
        price: 2.50,
        quantity: 10,
        description: 'Test description',
        imageUrl: ''
      });
    });
  });

  it('should call onCancel when cancel button is clicked', () => {
    renderSweetForm();
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('should disable form when loading', () => {
    renderSweetForm({ loading: true });
    
    expect(screen.getByLabelText(/sweet name/i)).toBeDisabled();
    expect(screen.getByLabelText(/category/i)).toBeDisabled();
    expect(screen.getByLabelText(/price/i)).toBeDisabled();
    expect(screen.getByLabelText(/quantity/i)).toBeDisabled();
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('should clear errors when user starts typing', async () => {
    renderSweetForm();
    
    // Trigger validation error
    const submitButton = screen.getByText('Create Sweet');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Sweet name is required')).toBeInTheDocument();
    });
    
    // Start typing to clear error
    fireEvent.change(screen.getByLabelText(/sweet name/i), { target: { value: 'T' } });
    
    expect(screen.queryByText('Sweet name is required')).not.toBeInTheDocument();
  });

  it('should render all category options', () => {
    renderSweetForm();
    
    const categorySelect = screen.getByLabelText(/category/i);
    const options = categorySelect.querySelectorAll('option');
    
    expect(options).toHaveLength(6); // 6 categories
    expect(options[0]).toHaveTextContent('Chocolate');
    expect(options[1]).toHaveTextContent('Candy');
    expect(options[2]).toHaveTextContent('Gummy');
    expect(options[3]).toHaveTextContent('Hard Candy');
    expect(options[4]).toHaveTextContent('Lollipop');
    expect(options[5]).toHaveTextContent('Other');
  });
});