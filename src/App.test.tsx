import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('opens task uploader', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Upload Tasks/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/paste tasks into the text box/i)).toBeVisible();
    });
  });

  it('shows sample data', async () => {
    render(<App />);
    const link = screen.getByText('use sample data');
    fireEvent.click(link);
    await waitFor(() => {
      expect(screen.getByText('Total tasks')).toBeInTheDocument();
      expect(screen.getByText('Gantt Chart Mock')).toBeInTheDocument();
    });
  });
});
