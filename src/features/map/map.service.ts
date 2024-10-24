class MapSerivce {
  async getMap() {
    const geoJson = feature(action.payload, action.payload.objects.map);

    const simplifyOptions = { tolerance: 0.008, highQuality: false };

    const simplifyFeatures = turf.simplify(geoJson, simplifyOptions);
  }
}
