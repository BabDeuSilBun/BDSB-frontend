declare namespace kakao.maps {
  class CustomOverlay {
    constructor(options: {
      position: LatLng;
      content: string | HTMLElement;
      map?: Map;
      zIndex?: number;
      yAnchor?: number;
      xAnchor?: number;
      clickable?: boolean;
    });

    setMap(map: Map | null): void;
  }
}
