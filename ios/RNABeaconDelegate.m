//
//  RNABeaconDelegate.m
//  AwesomeProject
//
//  Created by Octavio Turra on 10/1/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RNABeaconDelegate.h"
#import "AltBeacon.h"
#import "RCTEventDispatcher.h"
#import "RNABeacon.h"

@implementation RNABeaconDelegate



- (id)init
{
  self = [super init];
  return self;
}

- (id)initWithParent: (RNABeacon*) parent{
  self = [super init];
  self.parent = parent;
  return self;
}

// Delegate methods
- (void)service:(AltBeacon *)service foundDevices:(NSMutableDictionary *)devices {
  NSMutableDictionary * dict = [[NSMutableDictionary alloc] init];
  if([[devices allKeys] count]>0){
    [dict setObject:(NSString *)self.parent.areaUUID forKey:@"uuid"];
    NSMutableArray * arr = [[NSMutableArray alloc] init];
    for(NSString *key in devices) {
      NSMutableDictionary * o = [[NSMutableDictionary alloc] init];
      [o setObject:key forKey:@"uuid"];
      [o setObject:(NSNumber *)[devices objectForKey:key] forKey:@"distance"];
      [arr addObject:o];
    }
    [dict setObject:(NSMutableArray *)arr forKey:@"beacons"];
    [self.parent sendEvent:@"didFoundBeacons" eventData:dict];
  }
}
@end
