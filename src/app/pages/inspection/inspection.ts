import {Component, inject} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ActivatedRoute} from '@angular/router';
import {InspectionForm} from '@pages/inspection-form/inspection-form';

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
    this.listName = this.route.snapshot.paramMap.get('id') ?? '';
  }

  get questions() {
    return this.questionMap[this.listName] ?? this.$questions;
  }

}

export const AMBU_LIFT = [
  {
    id: "Freefromanyexternaldamageorlea",
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
    id: "Mirrorscleanandproperlyadjuste",
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
    id: "Fireextinguisheravailableandval",
    title: "Fire extinguisher available and valid",
    type: "Choice",
    required: true
  },
  {id: "Firstaidkitavailable", title: "First aid kit available", type: "Choice", required: true},
  {
    id: "Interiorplatformlightsoperatio",
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
    id: "Platformdoorsopenandclosesmoot",
    title: "Platform doors open and close smoothly",
    type: "Choice",
    required: true
  },
  {
    id: "Operateliftplatformupanddownsmo",
    title: "Operate lift platform up and down smoothly",
    type: "Choice",
    required: true
  },
  {
    id: "Servicebrakeandparkingbrakewor",
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
    id: "Checkmainbodyairconditionprovi",
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
  {id: "FleetNumber", title: "Fleet Number", type: "FleetNumber", required: true},
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
  {id: "Vehicle_x0020_Fleet_x0020_Number", title: "Vehicle Fleet Number", type: "FleetNumber", required: true},
  {
    id: "Isthevehiclefreefromvisibledamag",
    title: "Is the vehicle free from visible damage or signs of corrosion?",
    type: "Choice",
    required: true
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
    required: true
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
    required: true
  },
  {
    id: "IstheAnkerbatterypercentagesuffi",
    title: "Is the Anker battery percentage sufficient?",
    type: "Choice",
    required: true,
    options: ['Yes', 'No', 'Not Applicable for this Vehicle']
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
  {id: "Vehicle_x0020_Fleet_x0020_Number", title: "Vehicle Fleet Number", type: "FleetNumber", required: true},
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
  {
    id: "IstheGSEfreefromForeignObjectDeb",
    title: "Is the GSE free from Foreign Object Debris (FOD)?",
    type: "Choice",
    required: true
  },
];
export const LEKTRO = [];
export const MCB = [];
export const PASSENGER_STEP = [];
export const TOYOTA_TRACTOR = [];
export const WATER_SERVICE = [];
