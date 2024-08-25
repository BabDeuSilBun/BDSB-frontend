interface Window {
  IMP: {
    init(merchantIdentifier: string): void;
    request_pay(
      params: {
        pg: string;
        pay_method: string;
        merchant_uid: string;
        name: string;
        amount: number;
        m_redirect_url: string;
      },
      callback: (response: {
        success: boolean;
        imp_uid: string;
        error_msg?: string;
      }) => void,
    ): void;
  };
}
