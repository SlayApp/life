//
//  RCTNativeTextInputHelpers.m
//  LifeTest
//
//  Created by Baran Yildirim on 12.05.25.
//

#import "RCTNativeTextInputHelpers.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTUIManagerUtils.h>
#import <React/RCTTextInputComponentView.h>



@implementation RCTNativeTextInputHelpers

#ifdef RCT_NEW_ARCH_ENABLED
@synthesize viewRegistry_DEPRECATED = _viewRegistry_DEPRECATED;
#endif // RCT_NEW_ARCH_ENABLED

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeTextInputHelpersSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"NativeTextInputHelpers";
}

- (void)clearText:(double)viewTag resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  [self.viewRegistry_DEPRECATED addUIBlock:^(RCTViewRegistry *viewRegistry) {
    NSNumber *reactTag = @(viewTag);
    RCTTextInputComponentView *view = (RCTTextInputComponentView *)[self.viewRegistry_DEPRECATED viewForReactTag:reactTag];
    [view applyAutoCorrectionWithCallback:^(NSString *correctedText) {
        resolve(correctedText);
    }];
  }];
}

@end

