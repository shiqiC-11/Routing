import Foundation
import MapKit

@objc(LocalSearchModule)
class LocalSearchModule: NSObject, MKLocalSearchCompleterDelegate {
  private var completer: MKLocalSearchCompleter?
  private var onResultsCallback: RCTResponseSenderBlock?
  private var onErrorCallback: RCTResponseSenderBlock?
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func startSearch(_ query: String, onResults: @escaping RCTResponseSenderBlock, onError: @escaping RCTResponseSenderBlock) {
    DispatchQueue.main.async {
      self.onResultsCallback = onResults
      self.onErrorCallback = onError
      
      if self.completer == nil {
        self.completer = MKLocalSearchCompleter()
        self.completer?.delegate = self
        self.completer?.resultTypes = [.address, .pointOfInterest]
      }
      
      self.completer?.queryFragment = query
    }
  }
  
  func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
    let results = completer.results.map { result -> [String: Any] in
      return [
        "place_id": "\(result.title)_\(result.subtitle)",
        "title": result.title,
        "subtitle": result.subtitle,
        "description": "\(result.title), \(result.subtitle)"
      ]
    }
    
    if let callback = onResultsCallback {
      callback([NSNull(), results])
    }
  }
  
  func completer(_ completer: MKLocalSearchCompleter, didFailWithError error: Error) {
    if let callback = onErrorCallback {
      callback([error.localizedDescription])
    }
  }
  
  @objc
  func getPlaceDetails(_ placeId: String, title: String, subtitle: String, callback: @escaping RCTResponseSenderBlock) {
    let searchRequest = MKLocalSearch.Request()
    searchRequest.naturalLanguageQuery = "\(title) \(subtitle)"
    
    let search = MKLocalSearch(request: searchRequest)
    search.start { (response, error) in
      if let error = error {
        callback([error.localizedDescription])
        return
      }
      
      guard let mapItem = response?.mapItems.first else {
        callback(["No results found"])
        return
      }
      
      let coordinates = [
        "latitude": mapItem.placemark.coordinate.latitude,
        "longitude": mapItem.placemark.coordinate.longitude
      ]
      
      var result: [String: Any] = [
        "place_id": placeId,
        "name": title,
        "coordinates": coordinates
      ]
      
      // Add address components if available
      if let postalAddress = mapItem.placemark.postalAddress {
        result["address"] = postalAddress.street
        result["city"] = postalAddress.city
        result["state"] = postalAddress.state
        result["country"] = postalAddress.country
        result["postalCode"] = postalAddress.postalCode
      }
      
      callback([NSNull(), result])
    }
  }
} 