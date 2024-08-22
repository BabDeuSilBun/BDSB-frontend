// import axios from 'axios';

// import { fireEvent, render, waitFor } from '@testing-library/react';
// import { useOrderStore } from '@/state/orderStore';

// import TeamOrderSettingPage from '@/app/teamOrderSetting';

// jest.mock('axios');
// jest.mock('@/state/orderStore', () => ({
//   useOrderStore: jest.fn(() => ({
//     isButtonActive: true,
//     formData: {
//       storeId: 1,
//       purchaseType: 'Some Type',
//       minHeadcount: 1,
//       maxHeadcount: 10,
//       isEarlyPaymentAvailable: true,
//       paymentAvailableAt: new Date(),
//       deliveredAddress: { postal: '', streetAddress: '', detailAddress: '' },
//       metAddress: { postal: '', streetAddress: '', detailAddress: '' },
//       description: 'Some description',
//     },
//   })),
// }));

// describe('TeamOrderSettingPage', () => {
//   it('submits data correctly', async () => {
//     const mockPost = jest.fn().mockResolvedValue({ data: 'success' });
//     (axios.post as jest.Mock) = mockPost;

//     const { getByText } = render(<TeamOrderSettingPage />);

//     fireEvent.click(getByText('다음으로'));

//     await waitFor(() => {
//       expect(mockPost).toHaveBeenCalledWith('/api/users/meetings', {
//         storeId: 1,
//         purchaseType: 'Some Type',
//         minHeadcount: 1,
//         maxHeadcount: 10,
//         isEarlyPaymentAvailable: true,
//         paymentAvailableAt: expect.any(Date),
//         deliveredAddress: { postal: '', streetAddress: '', detailAddress: '' },
//         metAddress: { postal: '', streetAddress: '', detailAddress: '' },
//         description: 'Some description',
//       });
//     });
//   });
// });
