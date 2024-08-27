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
  kakao: typeof kakao;
}

declare namespace kakao {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Map {
      constructor(container: HTMLElement, options: object);
      setCenter(position: LatLng): void;
    }

    class Marker {
      constructor(options: object);
      setMap(map: Map): void;
    }

    class Polyline {
      constructor(options: object);
      setMap(map: Map): void;
    }

    interface GeocoderAddressResult {
      y: string;
      x: string;
      address_name: string;
    }

    namespace services {
      class Geocoder {
        addressSearch(
          address: string,
          callback: (
            result: GeocoderAddressResult[],
            status: kakao.maps.services.Status,
          ) => void,
        ): void;
      }

      enum Status {
        OK = 'OK',
      }
    }
  }
}
