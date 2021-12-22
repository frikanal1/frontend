import styled from "@emotion/styled"
import { Form } from "modules/form/components/Form"
import { FormField, FormFieldWithProps } from "modules/form/components/FormField"
import { useFormSubmission } from "modules/form/hooks/useFormSubmission"
import { ControlledDropdownInput } from "modules/input/components/ControlledDropdownInput"
import { ControlledTextInput } from "modules/input/components/ControlledTextInput"
import { useObserver } from "modules/state/hooks/useObserver"
import { ButtonList } from "modules/ui/components/ButtonList"
import { GenericButton } from "modules/ui/components/GenericButton"
import { InternalLink } from "modules/ui/components/InternalLink"
import { ProgressBar } from "modules/ui/components/ProgressBar"
import { StatusLine, StatusLineProps } from "modules/ui/components/StatusLine"
import { VideoUpload } from "../classes/VideoUpload"

const breakpoint = 550

const Container = styled.div``

const StyledForm = styled(Form)`
  display: grid;
  align-content: start;

  grid-template-columns: 1fr 1fr;
  grid-template-areas: "name categories" "description description" "footer footer";
  gap: 24px;

  @media (max-width: ${breakpoint}px) {
    grid-template-columns: 1fr;
    grid-template-areas: "name" "categories" "description" "footer";
  }
`

const Field = styled(FormField as FormFieldWithProps<{ area: string }>)`
  grid-area: ${(props) => props.area};
`

const FormFooter = styled.div`
  grid-area: footer;
`

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`

export type VideoUploadViewProps = {
  upload: VideoUpload
}

export function VideoUploadView(props: VideoUploadViewProps) {
  const { upload } = props

  const { submitting, uploadStatus, progress, video } = useObserver(() => ({
    submitting: upload.submitting,
    uploadStatus: upload.status,
    progress: upload.progress,
    video: upload.video,
  }))

  const [status, handleSubmit] = useFormSubmission(upload.form, async () => {
    await upload.submit()
  })

  const getFinalStatus = (): StatusLineProps => {
    if (uploadStatus === "uploading") {
      return {
        fingerprint: -1,
        message: `${submitting ? "Lagrer videon når den er lastet opp" : "Laster opp"} (${Math.floor(progress * 100)})`,
        fadeOut: false,
        type: "loading",
      }
    }

    if (uploadStatus === "failed") {
      return {
        fingerprint: -2,
        message: "Opplasting feilet",
        fadeOut: false,
        type: "error",
      }
    }

    if (uploadStatus === "completed") {
      return {
        fingerprint: -3,
        message: "Ferdig! Klikk lagre for å sende inn video.",
        fadeOut: false,
        type: "success",
      }
    }

    return status
  }

  const renderStatus = () => {
    if (video) {
      return <InternalLink href={`/video/${video}`}>Ferdig! Klikk her for å gå til videosiden</InternalLink>
    }

    return <StatusLine {...getFinalStatus()} />
  }

  return (
    <Container>
      <StyledForm form={upload.form} onSubmit={handleSubmit}>
        <Field area="name" label="Tittel" name="title">
          <ControlledTextInput name="title" />
        </Field>
        <Field area="categories" label="Kategori" name="categories">
          <ControlledDropdownInput name="categories" />
        </Field>
        <Field area="description" label="Beskrivelse" name="description">
          <ControlledTextInput multiline name="description" />
        </Field>
        <FormFooter>
          <ProgressBar value={progress} />
          <FooterContent>
            {renderStatus()}
            <ButtonList horizontal>
              <GenericButton variant="primary" onClick={handleSubmit} label="Last opp" />
              <GenericButton variant="secondary" onClick={() => upload.cancel()} label="Avbryt" />
            </ButtonList>
          </FooterContent>
        </FormFooter>
      </StyledForm>
    </Container>
  )
}
