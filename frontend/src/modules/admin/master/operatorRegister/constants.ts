import { OperatorRegisterFormInput } from "./validations";

export interface OperatorRegisterFieldConfig {
  readonly key: keyof OperatorRegisterFormInput;
  readonly label: string;
  readonly type: "text" | "email" | "tel" | "url" | "number" | "textarea" | "select" | "file";
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly textTransform?: "uppercase" | "lowercase" | "capitalize";
  readonly colSpan?: 1 | 2;
  readonly optionsKey?: "operatorTypes" | "isFetchList" | "statusList";
  readonly staticOptions?: readonly { readonly label: string; readonly value: string }[];
}

export const operatorRegisterFieldsConfig: readonly OperatorRegisterFieldConfig[] = [
  {
    key: "operatorIcon",
    label: "Operator Icon",
    type: "file",
    placeholder: "Upload operator logo or icon",
    required: false,
    colSpan: 2,
  },
  {
    key: "operatorTypeId",
    label: "Operator Type",
    type: "select",
    placeholder: "Select Operator Type",
    required: true,
    optionsKey: "operatorTypes",
    colSpan: 1,
  },
  {
    key: "operatorName",
    label: "Operator Name",
    type: "text",
    placeholder: "e.g. Jio Prepaid, Airtel DTH, BESCOM",
    required: true,
    textTransform: "capitalize",
    colSpan: 1,
  },
  {
    key: "stateName",
    label: "State Name",
    type: "text",
    placeholder: "e.g. All India, Maharashtra, Delhi",
    required: false,
    textTransform: "capitalize",
    colSpan: 1,
  },
  {
    key: "optionalParameter",
    label: "Optional Parameter",
    type: "text",
    placeholder: "e.g. Account Number, Sub-division Code",
    required: false,
    colSpan: 1,
  },
  {
    key: "parameterLink",
    label: "Parameter Link",
    type: "text",
    placeholder: "e.g. https://api.partner.com/plans",
    required: false,
    colSpan: 1,
  },
  {
    key: "isFetch",
    label: "Is Fetch",
    type: "select",
    placeholder: "Select Fetch Option",
    required: true,
    optionsKey: "isFetchList",
    colSpan: 1,
    staticOptions: [
      { label: "No", value: "N" },
      { label: "Yes", value: "Y" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "Select Status",
    required: true,
    optionsKey: "statusList",
    colSpan: 1,
    staticOptions: [
      { label: "Active", value: "Y" },
      { label: "Inactive", value: "N" },
    ],
  },
];
