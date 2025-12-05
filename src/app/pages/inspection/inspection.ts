import {Component, inject} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ActivatedRoute} from '@angular/router';
import {InspectionForm} from '@pages/inspection/inspection-form/inspection-form';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.html',
  styleUrls: ['./inspection.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [InspectionForm]
})
export class Inspection {
  listName = '';
  route = inject(ActivatedRoute);
  $questions = [];

  private questionMap: Record<string, any[]> = {
    'AmbuLift - Daily Inspection Checklist': AMBU_LIFT,
    'Air Condition Unit - Daily Inspection Checklist': AIR_CONDITION_UNIT,
    'Baggage Trolly - Daily Inspection Checklist': BAGGAGE_TROLLY,
    'FBO Vehicle Daily Inspection Checklist': FBO_VEHICLE,
    'GPU - Daily Inspection Checklist': GPU,
    'JX027 TLD TMX 450 - Daily Inspection Checklist': JX027_TLD_TMX_450,
    'Lavatory Service - Daily Inspection Checklist': LAVATORY_SERVICE,
    'Lektro - Daily Inspection Checklist': LEKTRO,
    'Mobile Conveyor Belt (MCB) - Daily Inspection Checklist': MCB,
    'Passenger Step': PASSENGER_STEP,
    'Toyota Tractor - Daily Inspection Checklist': TOYOTA_TRACTOR,
    'Water Service - Daily Inspection Checklist': WATER_SERVICE
  };

  constructor() {
    this.listName = this.route.snapshot.paramMap.get('list') ?? '';
  }

  get questions() {
    return this.questionMap[this.listName] ?? this.$questions;
  }

}

export const AMBU_LIFT = [
  {
    id: "Freefromanyexternaldamageorleaks",
    title: "Free from any external damage or leaks",
    type: "Choice",
    required: true
  },
  {
    id: "Cleanliness_x2013_cabin_x002c_pl",
    title: "Cleanliness – cabin, platform, controls",
    type: "Choice",
    required: true
  },
  {id: "AVPdisplayedandvalid", title: "AVP displayed and valid", type: "Choice", required: true},
  {id: "Batteryconditionisgood", title: "Battery condition is good", type: "Choice", required: true},
  {id: "Tirespressuresatisfactory", title: "Tires pressure satisfactory", type: "Choice", required: true},
  {
    id: "Lights_x0028_headlights_x002c_in",
    title: "Lights (headlights, indicators, brake lights) – operational",
    type: "Choice",
    required: true
  },
  {
    id: "Mirrorscleanandproperlyadjusted",
    title: "Mirrors clean and properly adjusted",
    type: "Choice",
    required: true
  },
  {
    id: "Windshieldandwipersfunctional",
    title: "Windshield and wipers functional",
    type: "Choice",
    required: true
  },
  {
    id: "Fireextinguisheravailableandvali",
    title: "Windshield and wipers functional",
    type: "Choice",
    required: true
  },
  {id: "Firstaidkitavailable", title: "First aid kit available", type: "Choice", required: true},
  {
    id: "Interiorplatformlightsoperationa",
    title: "Interior platform lights operational",
    type: "Choice",
    required: true
  },
  {
    id: "Checkintercom_x002f_communicatio",
    title: "Check intercom/communication system",
    type: "Choice",
    required: true
  },
  {id: "Testemergencystopswitches", title: "Test emergency stop switches", type: "Choice", required: true},
  {
    id: "Platformdoorsopenandclosesmoothl",
    title: "Platform doors open and close smoothly",
    type: "Choice",
    required: true
  },
  {
    id: "Operateliftplatformupanddownsmoo",
    title: "Operate lift platform up and down smoothly",
    type: "Choice",
    required: true
  },
  {
    id: "Servicebrakeandparkingbrakeworki",
    title: "Service brake and parking brake working",
    type: "Choice",
    required: true
  },
  {
    id: "Stabilizersshoulddeploysmoothly_",
    title: "Stabilizers should deploy smoothly, lock securely, be leak-free, and keep the AmbuLift stable",
    type: "Choice",
    required: true
  },
  {
    id: "Checkmainbodyairconditionprovide",
    title: "Check main body air condition provide sufficient cooling",
    type: "Choice",
    required: true
  },
];
export const AIR_CONDITION_UNIT = [
  {
    id: "Fireextinguisherisavailableandva",
    title: "Fire extinguisher is available and valid",
    type: "Choice",
    required: true
  },
  {
    id: "TiresPressureareadequateforopera",
    title: "Tires Pressure are adequate for operation",
    type: "Choice",
    required: true
  },
  {
    id: "Unitiscleanandfreefromoilleakage",
    title: "Unit is clean and free from oil leakage",
    type: "Choice",
    required: true
  },
  {
    id: "Supplyhosesfreefromtears_x002c_c",
    title: "Supply hoses free from tears, cracks, or punctures",
    type: "Choice",
    required: true
  },
  {
    id: "Hoseends_x002f_couplingsingoodco",
    title: "Hose ends/couplings in good condition",
    type: "Choice",
    required: true
  },
  {id: "Hoseproperlystowed", title: "Hose properly stowed", type: "Choice", required: true},
  {
    id: "Filterstatusindicators_x0028_ifa",
    title: "Filter status indicators (if available) checked",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  },
  {
    id: "Compressorrunningsmoothlywithout",
    title: "Compressor running smoothly without unusual noise",
    type: "Choice",
    required: true
  },
  {id: "Start_x002f_stopswitchworking", title: "Start/stop switch working", type: "Choice", required: true},
  {
    id: "Unitstartswithoutabnormalvibrati",
    title: "Unit starts without abnormal vibration or noise",
    type: "Choice",
    required: true
  },
  {
    id: "Controlpanelfunctioningcorrectly",
    title: "Control panel functioning correctly",
    type: "Choice",
    required: true
  },
  {
    id: "Tiresingoodcondition_x0028_nocut",
    title: "Tires in good condition (no cuts, cracks, low pressure)",
    type: "Choice",
    required: true
  },
  {id: "Beconlightisworking", title: "Becon light is working", type: "Choice", required: true},
  {id: "Towingarmisingoodcondition", title: "Towing arm is in good condition", type: "Choice", required: true},
  {id: "Towingarmbrakeisfunctioning", title: "Towing arm brake is functioning", type: "Choice", required: true},
  {id: "UnitisfreefromFOD", title: "Unit is free from FOD", type: "Choice", required: true}
];
export const BAGGAGE_TROLLY = [
  {
    id: "FleetNumber",
    title: "Fleet Number",
    type: "FleetNumber",
    required: true,
    options: ['JX011', 'JX012', 'JX013', 'JX014', 'JX015', 'JX016', 'JX017']
  },
  {id: "Exteriorconditionissatisfactory", title: "Exterior condition is satisfactory", type: "Choice", required: true},
  {id: "Tiresareingoodcondition", title: "Tires are in good condition", type: "Choice", required: true},
  {
    id: "Dollycurtainsareingoodcondition",
    title: "Dolly curtains are in good condition",
    type: "Choice",
    required: true
  },
  {
    id: "Reartowinghitchisingoodcondition",
    title: "Rear towing hitch is in good condition",
    type: "Choice",
    required: true
  },
  {
    id: "InteriorCleanlinessissatisfactor",
    title: "Interior Cleanliness is satisfactory",
    type: "Choice",
    required: true
  },
  {
    id: "Dollyisfreefromleakage",
    title: "Dolly is free from leakage",
    type: "Choice",
    required: true
  },
  {
    id: "Dolly_x0020_is_x0020_free_x0020_",
    title: "Dolly is free from FOD",
    type: "Choice",
    required: false
  },
  {
    id: "Tiers_x0020_are_x0020_free_x0020",
    title: "Tiers are free from uneven cut and damage",
    type: "Choice",
    required: true
  },
  {
    id: "Towing_x0020_arm_x0020_is_x0020_",
    title: "Towing arm is in good condition",
    type: "Choice",
    required: true
  },
  {
    id: "Towing_x0020_arm_x0020_brake_x00",
    title: "Towing arm brake is functioning properly",
    type: "Choice",
    required: true
  },
];
export const FBO_VEHICLE = [
  {
    id: "Vehicle_x0020_Fleet_x0020_Number",
    title: "Vehicle Fleet Number",
    type: "FleetNumber",
    required: true,
    options: [
      'Silverado 28920',
      'MINI Cooper 49722',
      'MINI Cooper 49723',
      'G-Class 13975',
      'Nissan Patrol 78242',
      'RR 46117',
      'RR 85294',
      'RR 59897',
      'Y 85144',
      '99472',
      '38630',
      'J 58300',
      '12 / 38630',
      '15 / 38447',
      '16 / 74315',
      'J 52600',
      'JX 007 Golf Cart (Buggy)',
      'JX 008 Golf Cart (Buggy)',
    ]
  },
  {
    id: "Isthevehiclefreefromvisibledamag",
    title: "Is the vehicle free from visible damage or signs of corrosion?",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA (Landside)']
  },
  {
    id: "IstheJetexbrandingplateavailable",
    title: "Is the Jetex branding plate available on both sides of the vehicle?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthevehiclecleanfromboththeexte",
    title: "Is the vehicle clean from both the exterior and interior?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthevehiclefreefromanyleaks_x00",
    title: "Is the vehicle free from any leaks?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthetirepressureadequateforuse_",
    title: "Is the tire pressure adequate for use?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthereanyunevenwear_x002c_cuts_",
    title: "Is there any uneven wear, cuts, or damage on the tires?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthevehiclefreefromanyforeignob",
    title: "Is the vehicle free from any foreign object debris (FOD)?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthefireextinguisheravailablean",
    title: "Is the fire extinguisher available and serviceable for use?",
    type: "Choice",
    required: true
  },
  {id: "IsAVPavailableandvalid_x003f_", title: "Is AVP available and valid?", type: "Choice", required: true},
  {
    id: "Isthevehiclefreefromanywarningli",
    title: "Is the vehicle free from any warning lights on the panel?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethevehicle_x2019_sseatbeltsan",
    title: "Are the vehicle's seat belts and seats free from cuts and marks?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthecamerainworkingcondition_x0",
    title: "Is the camera in working condition?",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  },
  {
    id: "Arethesafetybeaconlightandhornin",
    title: "Are the safety beacon light and horn in working condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethefootbrakeandparkingbrakein",
    title: "Are the foot brake and parking brake in proper working condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Are_x0020_the_x0020_first_x0020_",
    title: "Are the first aid kit/torch light available for use?",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  },
  {
    id: "IstheAnkerbatterypercentagesuffi",
    title: "Is the Anker battery percentage sufficient?",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  },
  {
    id: "Vehicle_x0020_tools_x0020_kit_x0",
    title: "Vehicle tools kit available",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  },
];
export const GPU = [
  {
    id: "Fleet_x0020_Number",
    title: "Vehicle Fleet Number",
    type: "FleetNumber",
    required: true,
    options: ['JX001', 'JX020']
  },
  {
    id: "Arethereanyvisiblesignsofdamage_",
    title: "Are there any visible signs of damage, such as scratches, dents, or cracks?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethereanysignsofinsulationdama",
    title: "Are there any signs of insulation damage, frayed copper, or overheating on the cables?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthecableadaptershowinganysigns",
    title: "Is the cable adapter showing any signs of arcing or burn marks?",
    type: "Choice",
    required: true
  },
  {
    id: "Aretheboltssecuringthecablestoth",
    title: "Are the bolts securing the cables to the plug properly tightened?",
    type: "Choice",
    required: true
  },
  {
    id: "IstheGSEfreefromlooseormissingco",
    title: "Is the GSE free from loose or missing components and signs of wear and tear?",
    type: "Choice",
    required: true
  },
  {
    id: "IstheGSEfreefromanyfluidoroillea",
    title: "Is the GSE free from any fluid or oil leakage?",
    type: "Choice",
    required: true
  },
  {
    id: "Istheemergencybuttonfreefromobst",
    title: "Is the emergency button free from obstruction or damage?",
    type: "Choice",
    required: true
  },
  {
    id: "IstheGSEfreefromFOD_x0028_Foreig",
    title: "Is the GSE free from FOD (Foreign Object Debris)?",
    type: "Choice",
    required: true
  },
  {
    id: "Istheequipmentcleanandingoodvisu",
    title: "Is the equipment clean and in good visual condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthetowhandlefunctioningproperl",
    title: "Is the tow handle functioning properly?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthebrakingmechanismfunctioning",
    title: "Is the braking mechanism functioning properly?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthetirepressureadequateforuse_",
    title: "Is the tire pressure adequate for use?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethereanysignsofunevenwear_x00",
    title: "Are there any signs of uneven wear, cuts, or damage on the tires?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethetowingarmandparkingbrakesf",
    title: "Are the towing arm and parking brakes functioning properly?",
    type: "Choice",
    required: true
  },
  {
    id: "DidyoustarttheGPUengineandperfor",
    title: "Did you start the GPU engine and perform a function check to confirm it is serviceable?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthesafetybeaconinworkingcondit",
    title: "Is the safety beacon in working condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Aretheindicatorsfreefromanywarni",
    title: "Are the indicators free from any warnings on the instrument panel?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethechocksavailableandservicea",
    title: "Are the chocks available and serviceable for operation?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthefireextinguisheravailablean",
    title: "Is the fire extinguisher available and serviceable for operation?",
    type: "Choice",
    required: true
  },
  {
    id: "IstheAVPvalidandavailable_x003f_",
    title: "Is the AVP valid and available?",
    type: "Choice",
    required: true
  },
];
export const JX027_TLD_TMX_450 = [
  {
    id: "Isthebeaconlight_x002c_headlight",
    title: "Is the beacon light, headlights, taillights, wipers and indicators being properly function?",
    type: "Choice",
    required: true
  },
  {
    id: "Istheequipmentfreefromvisibledam",
    title: "Is the equipment free from visible damage (scratches, dents, cracks, etc.)",
    type: "Choice",
    required: true
  },
  {
    id: "Arethesidemirrorscleanandproperl",
    title: "Are the side mirrors clean and properly adjusted?",
    type: "Choice",
    required: true
  },
  {
    id: "Istheequipmentfreefromanyoilorfu",
    title: "Is the equipment free from any oil or fuel leaks?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthetowinghookssecurelyfastened",
    title: "Is the towing hooks securely fastened?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthecleanlinessandappearanceoft",
    title: "Is the cleanliness and appearance of the GSE satisfactory?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthetirepressureadequate_x003f_",
    title: "Is the tire pressure adequate?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethetiresfreefromunevenwear_x0",
    title: "Are the tires free from uneven wear, cuts, or damage?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethesafetybeltsandseatfunction",
    title: " Are the safety belts and seat functioning properly and free from damage?",
    type: "Choice",
    required: true
  },
  {
    id: "Istheredashboardpanelfreeofanyil",
    title: "Is there dashboard panel free of any illuminated warning lights or indicators?",
    type: "Choice",
    required: true
  },
  {
    id: "Arealllights_x0028_brakelights_x",
    title: "Are all lights (brake lights, indicators) functioning properly?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthesteeringwheelfreefromloosen",
    title: "Is the steering wheel free from looseness and excessive vibration?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthecraboptionworkingproperly_x",
    title: "Is the crab option working properly?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethefoot_x002f_parkingbrakesis",
    title: "Are the foot/parking brakes is working Properly?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthecabinliftingmechanisminprop",
    title: "Is the cabin lifting mechanism in proper working condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethereverselights_x002c_safety",
    title: "Are the reverse lights, safety beacon, horn, and reverse buzzer serviceable and functioning properly?",
    type: "Choice",
    required: true
  },
  {
    id: "Arechocksavailableandinserviceab",
    title: "Are chocks available and in serviceable condition?",
    type: "Choice",
    required: true
  },
  {
    id: "IsAVPavailableandvalid_x003f_",
    title: "Is AVP available and valid?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethetowingpinsatthefrontandbac",
    title: "Are the towing pins at the front and back in good condition and properly secured?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthefireextinguisheravailable_x",
    title: "Is the fire extinguisher available, properly charged, and within its validity date?",
    type: "Choice",
    required: true
  },
  {
    id: "IstheGSEfreefromForeignObjectDeb",
    title: "Is the GSE free from Foreign Object Debris (FOD)?",
    type: "Choice",
    required: true
  },
];
export const LAVATORY_SERVICE = [
  {id: "FleetNumber", title: "Fleet Number", type: "FleetNumber", required: true, options: ['JX006', 'JX026']},
  {
    id: "LavTruckCleanlinessissatisfactor",
    title: "Lav Truck Cleanliness is satisfactory",
    type: "Choice",
    required: true
  },
  {
    id: "Chocksareavailableandserviceable",
    title: " Chocks are available and serviceable",
    type: "Choice",
    required: true
  },
  {
    id: "FireExtinguisheravailableandvali",
    title: "Fire Extinguisher available and valid ",
    type: "Choice",
    required: true
  },
  {
    id: "BeaconLightisworking",
    title: "Beacon Light is working",
    type: "Choice",
    required: true
  },
  {
    id: "HornBuzzerareworking",
    title: "Horn & Buzzer are working",
    type: "Choice",
    required: true
  },
  {
    id: "Chassiscomponentsissatisfactory",
    title: "Chassis components is satisfactory",
    type: "Choice",
    required: true
  },
  {
    id: "Oilissufficientforoperation",
    title: "Oil is sufficient for operation",
    type: "Choice",
    required: true
  },
  {
    id: "Tirespressurearesufficientforuse",
    title: "Tires pressure are sufficient for use",
    type: "Choice",
    required: true
  },
  {
    id: "TanksFittingsHosesisingoodcondit",
    title: "Tanks Fittings & Hoses is in good condition",
    type: "Choice",
    required: true
  },
  {
    id: "Tanksvalvecaparesatisfactory",
    title: "Tanks valve & cap are satisfactory",
    type: "Choice",
    required: true
  },
  {
    id: "Tankswasteisempty",
    title: "Tanks waste is empty",
    type: "Choice",
    required: true
  },
  {
    id: "EngineFunctioningsatisfactory",
    title: "Engine Functioning satisfactory",
    type: "Choice",
    required: true
  },
  {
    id: "Breaksareworkingproperly",
    title: "Breaks are working properly",
    type: "Choice",
    required: true
  },
  {
    id: "Mirrorwindscreensisgoodcondition",
    title: "Mirror & wind screens is good condition",
    type: "Choice",
    required: true
  },
  {
    id: "PumpFunctioningsatisfactory",
    title: "Pump Functioning satisfactory",
    type: "Choice",
    required: true
  },
  {
    id: "Towhandleoperationsatisfactory",
    title: "Tow handle operation satisfactory",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  },
  {
    id: "Towhandlebrakeisworking",
    title: "Tow handle brake is working",
    type: "Choice",
    required: true
  },
  {
    id: "Batterylevelissufficientforopera",
    title: "Battery level is sufficient for operation",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  }
];
export const LEKTRO = [
  {
    id: "Fleet_x0020_Number",
    title: "Fleet Number",
    type: "FleetNumber",
    required: true,
    options: ['JX018', 'JX019', 'JX031']
  },
  {
    id: "Isthesafetycatchhookingoodcondit",
    title: "Is the safety catch hook in good condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethe_x201c_D_x201d_ringandhook",
    title: "Are the “D” ring and hook attachment stitching in good condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Istheattachmenthitchusedtosecure",
    title: "Is the attachment hitch used to secure different tow adapters in good condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthestrutstrapsprotectivesleeve",
    title: "Is the strut strap's protective sleeve in good condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Aretherubberanti_x002d_slippadso",
    title: "Are the rubber anti-slip pads on the foot brake and accelerator pedals intact and free from excessive wear?",
    type: "Choice",
    required: true
  },
  {
    id: "IstheLektrofreefromanylooseormis",
    title: "Is the Lektro free from any loose or missing components?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethebatterychargerconnectorsan",
    title: "Are the battery charger connectors and cables available and in good condition?",
    type: "Choice",
    required: true
  },
  {
    id: "IstheGSEfreefromanyfluidleaks_x0",
    title: "Is the GSE free from any fluid leaks?",
    type: "Choice",
    required: true
  },
  {
    id: "Istheemergencybuttondisengagedan",
    title: "Is the emergency button disengaged and in its normal position?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethecleanlinessandappearancesa",
    title: "Are the cleanliness and appearance satisfactory?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethetirespressuresadequateforo",
    title: "Are the tires' pressures adequate for operation?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethetiresfreefromunevenwear_x0",
    title: "Are the tires free from uneven wear, cuts, or damage?",
    type: "Choice",
    required: true
  },
  {
    id: "Istheinstrumentpanelfreefromanyw",
    title: "Is the instrument panel free from any warning’s indicators?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethepowerdisconnectingbuttons_",
    title: "Are the power disconnecting buttons (2) operating correctly?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthewinchcut_x002d_offserviceab",
    title: "Is the winch cut-off serviceable?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthecradleinproperworkingcondit",
    title: "Is the cradle in proper working condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethelights_x002c_safetybeacon_",
    title: "Are the lights, safety beacon, horn, and reverse buzzer in serviceable condition?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethefootbrakeandparkingbrakewo",
    title: "Are the foot brake and parking brake working?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthefireextinguisheravailablean",
    title: "Is the fire extinguisher available and serviceable for use?",
    type: "Choice",
    required: true
  },
  {
    id: "IstheGSEfreefromforeignobjectdeb",
    title: "Is the GSE free from foreign object debris (FOD)?",
    type: "Choice",
    required: true
  },
  {
    id: "IsAVPavailableandvalid_x003f_",
    title: "Is AVP available and valid?",
    type: "Choice",
    required: true
  },
  {
    id: "Bypass_x0020_Pin_x0020_Available",
    title: "Bypass Pin Available",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  }
];
export const MCB = [
  {id: "FleetNumber", title: "Fleet Number", type: "FleetNumber", required: true, options: ['JX002', 'JX022']},
  {id: "MCBcleanlinessissatisfactory", title: "MCB cleanliness is satisfactory ", type: "Choice", required: true},
  {
    id: "Tirespressureissufficientforoper",
    title: "Tires pressure is sufficient for operation",
    type: "Choice",
    required: true
  },
  {id: "Beaconlightisworking", title: "Beacon light is working", type: "Choice", required: true},
  {id: "Hazardlightisworking", title: "Hazard light is working", type: "Choice", required: true},
  {id: "HornBuzzerareworking", title: "Horn & Buzzer are working", type: "Choice", required: true},
  {
    id: "Fireextinguisheravailableandserv",
    title: "Fire extinguisher available and serviceable ",
    type: "Choice",
    required: true
  },
  {id: "Equipmentisfreeformleakage", title: "Equipment is free form leakage", type: "Choice", required: true},
  {id: "Indicatorslightsareworking", title: "Indicators & lights are working ", type: "Choice", required: true},
  {
    id: "Boomprotectionsissatisfactoryfor",
    title: "Boom protections is satisfactory for operation",
    type: "Choice",
    required: true
  },
  {id: "Electricalpartsaresatisfactory", title: "Electrical parts are satisfactoryr", type: "Choice", required: true},
  {id: "Emergencystopisworking", title: "Emergency stop is working", type: "Choice", required: true},
  {id: "AVP_x0020_is_x0020_available_x00", title: "AVP is available and valid", type: "Choice", required: true},
  {id: "Fuel_x0020_is_x0020_sufficient_x", title: "Fuel is sufficient for operation", type: "Choice", required: true},
  {
    id: "Tires_x0020_Pressure_x0020_are_x",
    title: "Tires Pressure are good for operation",
    type: "Choice",
    required: true
  },
  {id: "Tires_x0020_is_x0020_free_x0020_", title: "Tires is free from Cut and damage", type: "Choice", required: true},
  {id: "Boom_x0020_lift_x0020_working_x0", title: "Boom lift working", type: "Choice", required: false},
  {
    id: "Panel_x0020_is_x0020_free_x0020_",
    title: "Panel is free from any waring indicator",
    type: "Choice",
    required: false
  },
  {
    id: "Stabilizers_x0020_are_x0020_work",
    title: "Stabilizers are working sand safe for operation",
    type: "Choice",
    required: false
  }
];
export const PASSENGER_STEP = [
  {id: "FleetNumber", title: "Fleet Number", type: "FleetNumber", required: true, options: ['JX023', 'JX024', 'JX028']},
  {id: "Passengerstep_x002d_Cleanliness", title: "Passenger step -Cleanliness", type: "Choice", required: true},
  {id: "BeaconlightWorking", title: "Beacon light Working", type: "Choice", required: true},
  {id: "Hazardlightsworking", title: "Hazard lights working", type: "Choice", required: true},
  {
    id: "Fireextinguisheravailableandserv",
    title: "Fire extinguisher available and serviceable",
    type: "Choice",
    required: true
  },
  {id: "Hornworking", title: "Horn working", type: "Choice", required: true},
  {id: "Buzzerworking", title: "Buzzer working", type: "Choice", required: true},
  {id: "Warningsignalsworking", title: "Warning signals working", type: "Choice", required: true},
  {id: "Paintconditionissatisfactory", title: "Paint condition is satisfactory", type: "Choice", required: true},
  {
    id: "Equipment_x002d_Labelsinstructio",
    title: "Equipment - Labels & instructions available",
    type: "Choice",
    required: true
  },
  {id: "Equipmentisfreefromleakage", title: "Equipment is free from leakage", type: "Choice", required: true},
  {
    id: "GSEfreefromDamage_x0028_chasisfr",
    title: "GSE free from Damage (chasis & frame)",
    type: "Choice",
    required: true
  },
  {
    id: "Equipment_x002d_Fluidlevelsissuf",
    title: "Equipment - Fluid levels is sufficient",
    type: "Choice",
    required: true
  },
  {
    id: "Safetybeltschainingoodcondition",
    title: "Safety belts& chain in good condition",
    type: "Choice",
    required: true
  },
  {id: "TiresarefreefromWearanddamage", title: "Tires are free from Wear and damage", type: "Choice", required: true},
  {id: "Equipmentengineisfunctional", title: "Equipment engine is functional", type: "Choice", required: true},
  {
    id: "Lights_x002d_Check_x0028_frontan",
    title: "Lights - Check (front and rear) is working",
    type: "Choice",
    required: true
  },
  {
    id: "MirrorsWindscreenisingoodconditi",
    title: "Mirrors & Windscreen is in good condition",
    type: "Choice",
    required: true
  },
  {
    id: "Platform_x002d_Check_x0028_Noski",
    title: "Platform - Check (No skid coating/covering)",
    type: "Choice",
    required: true
  },
];
export const TOYOTA_TRACTOR = [
  {id: "FleetNumber", title: "Fleet Number", type: "FleetNumber", required: true, options: ['JX009', 'JX010']},
  {
    id: "Isthevehiclefreefromvisibledamag",
    title: "Is the vehicle free from visible damage (scratches, dents, cracks)?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethemirrorscleanandproperlyadj",
    title: "Are the mirrors clean and properly adjusted?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthevehiclefreefromanyoilorfuel",
    title: "Is the vehicle free from any oil or fuel leaks?",
    type: "Choice",
    required: true
  },
  {id: "Arethetowinghookboltssecured_x00", title: "Are the towing hook bolts secured?", type: "Choice", required: true},
  {
    id: "Isthetirepressureadequateforuse_",
    title: "Is the tire pressure adequate for use?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthereanyunevenwear_x002c_cuts_",
    title: "Is there any uneven wear, cuts, or damage to the tires?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethereanywarninglightsorindica",
    title: "Are there any warning lights or indicators illuminated on the instrument panel?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethesafetybeltsfunctioningprop",
    title: "Are the safety belts functioning properly and free from damage?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthesteeringwheelfunctioningpro",
    title: "Is the steering wheel functioning properly?",
    type: "Choice",
    required: true
  },
  {
    id: "Arethelights_x002c_safetybeacon_",
    title: "Are the lights, safety beacon, horn, and reverse buzzer all serviceable and functioning properly?",
    type: "Choice",
    required: true
  },
  {
    id: "Isthefireextinguisheravailablean",
    title: "Is the fire extinguisher available and serviceable for use?",
    type: "Choice",
    required: true
  },
  {id: "IstheAVPavailableandvalid_x003f_", title: "Is the AVP available and valid?", type: "Choice", required: true},
  {
    id: "IsthevehiclefreefromFOD_x0028_Fo",
    title: "Is the vehicle free from FOD (Foreign Object Debris)?",
    type: "Choice",
    required: true
  },
];
export const WATER_SERVICE = [
  {id: "FleetNumber", title: "Fleet Number", type: "FleetNumber", required: true, options: ['JX005', 'JX025']},
  {
    id: "WaterTruckCleanlinessissatisfact",
    title: "Water Truck Cleanliness is satisfactory",
    type: "Choice",
    required: true
  },
  {id: "WaterTruckChocksareavailable", title: "Water Truck Chocks are available", type: "Choice", required: true},
  {
    id: "FireExtinguisheravailableandvali",
    title: "Fire Extinguisher available and valid",
    type: "Choice",
    required: true
  },
  {id: "BeaconLightisworking", title: "Beacon Light is working", type: "Choice", required: true},
  {id: "BasketOperationissatisfactory", title: "Basket Operation is satisfactory", type: "Choice", required: true},
  {id: "HornandBuzzerareworking", title: "Horn and Buzzer are working", type: "Choice", required: true},
  {id: "Chassis_x002d_Componentsisgood", title: "Chassis - Components is good", type: "Choice", required: true},
  {
    id: "Tanks_x002d_Waterlevelissatisfac",
    title: "Tanks - Water level is satisfactory",
    type: "Choice",
    required: true
  },
  {
    id: "TanksFittingsHosesisingoodcondit",
    title: "Tanks Fittings & Hoses is in good condition",
    type: "Choice",
    required: true
  },
  {
    id: "ChlorineValue_x0028_inPPM_x0029_",
    title: "Chlorine Value (in PPM) is satisfactory",
    type: "Choice",
    required: true
  },
  {
    id: "MirrorWindscreenisingoodconditio",
    title: "Mirror & Windscreen is in good condition",
    type: "Choice",
    required: true
  },
  {id: "Oilissufficientforoperation", title: "Oil is sufficient for operation", type: "Choice", required: true},
  {
    id: "Tirespressureissufficientforoper",
    title: "Tires pressure is sufficient for operation",
    type: "Choice",
    required: true
  },
  {
    id: "WaterCart_x002d_Towhandleoperati",
    title: "Water Cart - Tow handle operational",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  },
  {
    id: "WaterCart_x002d_Towhandlebrakeis",
    title: "Water Cart - Tow handle brake is working",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'NA']
  },
];
