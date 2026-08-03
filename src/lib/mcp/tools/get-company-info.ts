import { defineTool } from "@lovable.dev/mcp-js";

import { org, PENDING_LABEL } from "@/config/org";

export default defineTool({
  name: "get_company_info",
  title: "Get company and compliance info",
  description:
    "Get ShriNeo Capital's public brand, legal entity, regulatory role and grievance-redressal facts as published on the website.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      brandName: org.brandName,
      legalEntity: org.legalEntity,
      brandLine: org.brandLine,
      role: org.role,
      roleStatement: org.roleStatement,
      cin: org.cin ?? PENDING_LABEL,
      registeredAddress: org.registeredAddress ?? PENDING_LABEL,
      supportEmail: org.supportEmail ?? PENDING_LABEL,
      supportPhone: org.supportPhone ?? PENDING_LABEL,
      grievanceOfficer: {
        name: org.grievanceOfficer.name ?? PENDING_LABEL,
        designation: org.grievanceOfficer.designation ?? PENDING_LABEL,
        email: org.grievanceOfficer.email ?? PENDING_LABEL,
        phone: org.grievanceOfficer.phone ?? PENDING_LABEL,
        address: org.grievanceOfficer.address ?? PENDING_LABEL,
        responseWindow: org.grievanceOfficer.responseWindow,
      },
      regulatoryNote: org.regulatoryNote,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
