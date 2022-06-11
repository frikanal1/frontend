import React, { useState } from "react"
import { styled } from "@mui/system"
import {
  getInitialRequireAuthenticationProps,
  RequireAuthentication,
} from "src/modules/auth/components/RequireAuthentication"
import { Form } from "src/modules/form/components/Form"
import { FormField, FormFieldWithProps } from "src/modules/form/components/FormField"
import { ControlledTextInput } from "src/modules/input/components/ControlledTextInput"
import { useManager } from "src/modules/state/manager"
import { createProfileForm } from "src/modules/user/forms/createProfileForm"
import { GenericButton } from "src/modules/ui/components/GenericButton"
import { StatusLine } from "src/modules/ui/components/StatusLine"
import { useFormSubmission } from "src/modules/form/hooks/useFormSubmission"
import { User } from "src/modules/user/schemas"
import { Section } from "src/modules/ui/components/Section"
import { OrganizationRoleItem } from "src/modules/user/components/OrganizationRoleItem"
import { Meta } from "src/modules/core/components/Meta"
import { ListTail } from "src/modules/state/components/ListTail"
import { useResourceList } from "src/modules/state/hooks/useResourceList"
import Link from "next/link"

const breakpoint = 800

const Container = styled("div")``

const Content = styled("div")`
  display: flex;

  @media (max-width: ${breakpoint}px) {
    flex-direction: column;
  }
`

const FormContainer = styled(Form)`
  margin-top: 16px;
  flex: 1;

  display: grid;
  align-content: start;

  grid-template-columns: 1fr;
  grid-template-areas: "firstName" "lastName" "phoneNumber" "footer";
  gap: 24px;
`

const FormFooter = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;

  grid-area: footer;
`

const Field = styled(FormField as FormFieldWithProps<{ area: string }>)`
  grid-area: ${(props) => props.area};
`

const OrganizationSection = styled(Section)`
  width: 400px;
  margin-left: 32px;

  @media (max-width: ${breakpoint}px) {
    margin-left: 0px;
    margin-top: 32px;
  }
`

const OrganizationList = styled("ul")`
  margin-bottom: 32px;
`

function Profile() {
  const manager = useManager()

  const { authStore, networkStore, listStore, organizationStore } = manager.stores
  const { api } = networkStore
  const user = authStore.user!

  // TODO: This is temporary until there is a separate User model
  const organizationList = listStore.ensure(`profile-organizations-${user.id}`, "organization", {
    path: "/organizations",
    params: {
      editor: user.id,
    },
  })

  const organizations = useResourceList(organizationList, organizationStore)

  const [form] = useState(() => createProfileForm(user, manager))

  const [status, handleSubmit] = useFormSubmission(form, async (serialized) => {
    const { data } = await api.put<User>(`/users/${user.id}`, serialized)

    // TODO: Fix this, users should be in a resource store
    Object.assign(authStore.user!, data)
  })

  return (
    <Container>
      <h1>Din profil</h1>
      <Meta
        meta={{
          title: "Din profil",
          description: "",
        }}
      />
      <Content>
        <FormContainer onSubmit={handleSubmit} form={form}>
          <Field area="firstName" label="Fornavn" name="firstName">
            <ControlledTextInput name="firstName" />
          </Field>
          <Field area="lastName" label="Etternavn" name="lastName">
            <ControlledTextInput name="lastName" />
          </Field>
          <FormFooter>
            <StatusLine {...status} />
            <GenericButton variant="primary" onClick={handleSubmit} label="Lagre" />
          </FormFooter>
        </FormContainer>
        <OrganizationSection icon="officeBuilding" title="Organisasjoner du er medlem av">
          <OrganizationList>
            {organizations.map((o) => (
              <OrganizationRoleItem key={o.data.id} editor={user.id === o.data.editor.id} organization={o} />
            ))}
            <ListTail list={organizationList} />
          </OrganizationList>
          <Link href={"/organization/new"} passHref>
            <GenericButton variant="secondary" label="Ny organisasjon" />
          </Link>
        </OrganizationSection>
      </Content>
    </Container>
  )
}

export default function Page() {
  return (
    <RequireAuthentication>
      <Profile />
    </RequireAuthentication>
  )
}

Page.getInitialProps = getInitialRequireAuthenticationProps
