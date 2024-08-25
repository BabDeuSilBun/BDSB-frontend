interface Window {
  IMP: {
    init(merchantIdentifier: string): void;
    request_pay(paymentData: any, callback: (response: any) => void): void;
  };
}
