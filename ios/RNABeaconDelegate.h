//
//  RNABeaconDelegate.h
//  AwesomeProject
//
//  Created by Octavio Turra on 10/1/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "AltBeacon.h"
#import "RNABeacon.h"

@interface RNABeaconDelegate : NSObject <AltBeaconDelegate>

@property RNABeacon* parent;

- (id)initWithParent:(RNABeacon *)parent;

@end
