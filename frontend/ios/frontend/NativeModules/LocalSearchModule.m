#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LocalSearchModule, NSObject)

RCT_EXTERN_METHOD(startSearch:(NSString *)query
                  onResults:(RCTResponseSenderBlock)onResults
                  onError:(RCTResponseSenderBlock)onError)

RCT_EXTERN_METHOD(getPlaceDetails:(NSString *)placeId
                  title:(NSString *)title
                  subtitle:(NSString *)subtitle
                  callback:(RCTResponseSenderBlock)callback)

@end 