import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type OrganizationFormType,
  OrganizationSchema,
} from "@schema/organization.schema";
import { OrganizationForm } from "./OrganizationForm";
import { Button } from "@components/ui/button";
import { useState } from "react";
import NotificationSuccess from "@components/_shared/Notifications";
import { api } from "@utils/api";
import { ErrorAlert } from "@components/_shared/Alerts";
import type { Organization } from "@portaljs/ckan";
import { match } from "ts-pattern";
import Spinner from "@components/_shared/Spinner";
import { useRouter } from "next/router";
import notify from "@utils/notify";

export const EditOrganizationForm: React.FC<{
  initialValues: Organization;
}> = ({ initialValues }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [organizationEdited, setOrganizationEdited] = useState("");
  const formObj = useForm<OrganizationFormType>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: initialValues,
  });

  const utils = api.useContext();
  const editOrganization = api.organization.patch.useMutation({
    onSuccess: async () => {
      notify(`Successfully edited the ${organizationEdited} organization`);
      setErrorMessage(null);
      await utils.organization.list.invalidate();
      await utils.organization.listForUser.invalidate();
    },
    onError: (error) => setErrorMessage(error.message),
  });

  return (
    <>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={formObj.handleSubmit((data) => {
          setOrganizationEdited(data.name);
          editOrganization.mutate(data);
        })}
      >
        <OrganizationForm formObj={formObj} />
        <div className="col-span-full">
          {match(editOrganization.isLoading)
            .with(false, () => (
              <Button
                type="submit"
                variant="secondary"
                className="mt-8 w-full py-4"
              >
                Edit Organization
              </Button>
            ))
            .otherwise(() => (
              <Button
                type="submit"
                variant="secondary"
                className="mt-8 flex w-full py-4"
              >
                <Spinner className="hover:text-slate-900" />
                Edit Organization
              </Button>
            ))}
        </div>
        {errorMessage && (
          <div className="py-4">
            <ErrorAlert text={errorMessage} />
          </div>
        )}
      </form>
    </>
  );
};
