declare namespace kakao {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Map {
      constructor(container: HTMLElement, options: object);
    }

    class Marker {
      constructor(options: object);
      setMap(map: Map): void;
    }

    class Polyline {
      constructor(options: object);
      setMap(map: Map): void;
    }

    namespace services {
      class Geocoder {
        addressSearch(
          address: string,
          callback: (result: never[], status: never) => void,
        ): void;
      }

      enum Status {
        OK,
      }
    }
  }
}
