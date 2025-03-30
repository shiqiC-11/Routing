import Foundation
import MapKit

@objc(LocalSearchModule)
class LocalSearchModule: NSObject, MKLocalSearchCompleterDelegate {
    private var completer: MKLocalSearchCompleter
    private var onResults: RCTResponseSenderBlock?
    private var onError: RCTResponseSenderBlock?
    
    override init() {
        completer = MKLocalSearchCompleter()
        super.init()
        completer.delegate = self
        completer.resultTypes = [.address, .pointOfInterest]
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc(startSearch:onResults:onError:)
    func startSearch(_ query: String, 
                    onResults: @escaping RCTResponseSenderBlock,
                    onError: @escaping RCTResponseSenderBlock) {
        self.onResults = onResults
        self.onError = onError
        completer.queryFragment = query
    }
    
    func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
        let results = completer.results.map { result in
            return [
                "place_id": "native_\(result.title.hash)",
                "description": "\(result.title), \(result.subtitle)",
                "main_text": result.title,
                "secondary_text": result.subtitle,
                "provider": "native"
            ]
        }
        onResults?([NSNull(), results])
    }
    
    func completer(_ completer: MKLocalSearchCompleter, didFailWithError error: Error) {
        onError?([error.localizedDescription])
    }
    
    @objc(getPlaceDetails:title:subtitle:callback:)
    func getPlaceDetails(_ placeId: String,
                        title: String,
                        subtitle: String,
                        callback: @escaping RCTResponseSenderBlock) {
        let searchRequest = MKLocalSearch.Request()
        searchRequest.naturalLanguageQuery = "\(title) \(subtitle)"
        
        let search = MKLocalSearch(request: searchRequest)
        search.start { response, error in
            if let error = error {
                callback([error.localizedDescription])
                return
            }
            
            guard let mapItem = response?.mapItems.first else {
                callback(["Place not found"])
                return
            }
            
            let result: [String: Any] = [
                "name": mapItem.name ?? title,
                "address": mapItem.placemark.title ?? subtitle,
                "coordinates": [
                    "latitude": mapItem.placemark.coordinate.latitude,
                    "longitude": mapItem.placemark.coordinate.longitude
                ],
                "provider": "native"
            ]
            
            callback([NSNull(), result])
        }
    }
} 