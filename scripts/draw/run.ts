/**
 * Draw every declared icon.
 *
 * Nothing is repaired here. A shape that breaks a rule throws inside its constructor, so
 * the run stops before a single file is written and the message names the icon and the
 * rule. That is the whole guarantee: what reaches disk was legal when it was made.
 */
import { buildAll } from "./build.ts";
import { BATCH_01 } from "./icons/batch-01.ts";
import { BATCH_02 } from "./icons/batch-02.ts";
import { BATCH_03 } from "./icons/batch-03.ts";
import { BATCH_04 } from "./icons/batch-04.ts";
import { BATCH_05 } from "./icons/batch-05.ts";
import { BATCH_06 } from "./icons/batch-06.ts";
import { BATCH_07 } from "./icons/batch-07.ts";
import { BATCH_08 } from "./icons/batch-08.ts";
import { BATCH_09 } from "./icons/batch-09.ts";
import { BATCH_10 } from "./icons/batch-10.ts";
import { BATCH_11 } from "./icons/batch-11.ts";
import { BATCH_12 } from "./icons/batch-12.ts";
import { BATCH_13 } from "./icons/batch-13.ts";
import { BATCH_14 } from "./icons/batch-14.ts";
import { BATCH_15 } from "./icons/batch-15.ts";
import { BATCH_16 } from "./icons/batch-16.ts";
import { BATCH_17 } from "./icons/batch-17.ts";
import { BATCH_18 } from "./icons/batch-18.ts";
import { BATCH_19 } from "./icons/batch-19.ts";
import { BATCH_20 } from "./icons/batch-20.ts";
import { BATCH_21 } from "./icons/batch-21.ts";
import { BATCH_22 } from "./icons/batch-22.ts";
import { BATCH_23 } from "./icons/batch-23.ts";
import { BATCH_24 } from "./icons/batch-24.ts";
import { BATCH_25 } from "./icons/batch-25.ts";
import { BATCH_26 } from "./icons/batch-26.ts";
import { BATCH_27 } from "./icons/batch-27.ts";
import { BATCH_28 } from "./icons/batch-28.ts";
import { BATCH_29 } from "./icons/batch-29.ts";
import { BATCH_30 } from "./icons/batch-30.ts";
import { BATCH_31 } from "./icons/batch-31.ts";
import { BATCH_32 } from "./icons/batch-32.ts";
import { BATCH_33 } from "./icons/batch-33.ts";
import { BATCH_34 } from "./icons/batch-34.ts";
import { BATCH_35 } from "./icons/batch-35.ts";
import { BATCH_36 } from "./icons/batch-36.ts";
import { BATCH_37 } from "./icons/batch-37.ts";
import { BATCH_38 } from "./icons/batch-38.ts";
import { BATCH_39 } from "./icons/batch-39.ts";
import { BATCH_40 } from "./icons/batch-40.ts";
import { BATCH_41 } from "./icons/batch-41.ts";
import { BATCH_42 } from "./icons/batch-42.ts";
import { BATCH_43 } from "./icons/batch-43.ts";
import { BATCH_44 } from "./icons/batch-44.ts";
import { BATCH_45 } from "./icons/batch-45.ts";
import { BATCH_46 } from "./icons/batch-46.ts";
import { BATCH_47 } from "./icons/batch-47.ts";
import { BATCH_48 } from "./icons/batch-48.ts";
import { BATCH_49 } from "./icons/batch-49.ts";
import { BATCH_50 } from "./icons/batch-50.ts";
import { BATCH_51 } from "./icons/batch-51.ts";
import { BATCH_52 } from "./icons/batch-52.ts";
import { BATCH_53 } from "./icons/batch-53.ts";
import { BATCH_54 } from "./icons/batch-54.ts";
import { BATCH_55 } from "./icons/batch-55.ts";

const ICONS = [
  ...BATCH_01, ...BATCH_02, ...BATCH_03, ...BATCH_04, ...BATCH_05, ...BATCH_06, ...BATCH_07, ...BATCH_08, ...BATCH_09, ...BATCH_10, ...BATCH_11, ...BATCH_12, ...BATCH_13, ...BATCH_14, ...BATCH_15, ...BATCH_16, ...BATCH_17, ...BATCH_18, ...BATCH_19, ...BATCH_20, ...BATCH_21, ...BATCH_22, ...BATCH_23, ...BATCH_24, ...BATCH_25, ...BATCH_26, ...BATCH_27, ...BATCH_28, ...BATCH_29, ...BATCH_30, ...BATCH_31, ...BATCH_32, ...BATCH_33, ...BATCH_34, ...BATCH_35, ...BATCH_36, ...BATCH_37, ...BATCH_38, ...BATCH_39, ...BATCH_40, ...BATCH_41, ...BATCH_42, ...BATCH_43, ...BATCH_44, ...BATCH_45, ...BATCH_46, ...BATCH_47, ...BATCH_48, ...BATCH_49, ...BATCH_50, ...BATCH_51, ...BATCH_52, ...BATCH_53, ...BATCH_54, ...BATCH_55,
];

const { icons, cells } = await buildAll(ICONS);
console.log(`${icons} ikon, ${cells} sel ditulis`);
