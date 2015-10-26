//
//  RNABeacon.m
//  AwesomeProject
//
//  Created by Octavio Turra on 10/1/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTBridge.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"

#import "AltBeacon.h"
#import "RNABeacon.h"
#import "RNABeaconDelegate.h"


@implementation RNABeacon

@synthesize bridge = _bridge;

- (void)sendEvent:(NSString *) eventName eventData:(NSDictionary *) eventData
{
  [self.bridge.eventDispatcher sendAppEventWithName:eventName
                                               body:eventData];
}

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(checkTransmissionSupported:(RCTResponseSenderBlock)callback)
{
  callback(@[@(true)]);
}

RCT_EXPORT_METHOD(startTransmitting:(NSString*)uuid params:(NSDictionary*)params onSuccess:(RCTResponseSenderBlock)onSuccess onError:(RCTResponseSenderBlock)onError){
  AltBeacon * beacon = [[AltBeacon alloc] initWithIdentifier:uuid];
  @try {
  [beacon startBroadcasting];
      onSuccess(@[]);
  }
  @catch (NSException *exception) {
    onError(@[[exception description]]);
  }
}
RCT_EXPORT_METHOD(startMonitoring:(NSString*)uuid){
  self.areaUUID = uuid;
  AltBeacon * beacon = [[AltBeacon alloc] initWithIdentifier:uuid];
  RNABeaconDelegate * delegate = [[RNABeaconDelegate alloc] initWithParent:self];
  [beacon addDelegate:delegate];
  [beacon startDetecting];
  [self sendEvent:@"startMonitoring" eventData:[[NSDictionary alloc]init]];
}
RCT_EXPORT_METHOD(startRanging:(NSString*)uuid){
  
}

@end