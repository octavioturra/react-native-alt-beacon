//
//  RNABeacon.h
//  AwesomeProject
//
//  Created by Octavio Turra on 10/1/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#ifndef RNABeacon_h
#define RNABeacon_h

#import "RCTBridgeModule.h"

@interface RNABeacon : NSObject <RCTBridgeModule>

@property NSString* areaUUID;

- (void)sendEvent:(NSString *) eventName eventData:(NSDictionary *) eventData;
  

@end

#endif /* RNABeacon_h */

