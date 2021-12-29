import { RefObject, useState, useEffect, useCallback } from "react"
import { Placement } from "@popperjs/core"
import { useStores } from "src/modules/state/manager"
import { getUniqueId } from "src/modules/state/helpers/getUniqueId"

export type UsePopoverOptions = {
  ref: RefObject<HTMLElement>
  render: () => React.ReactNode
  placement?: Placement
  autoDismiss?: boolean
}

export const usePopover = (options: UsePopoverOptions) => {
  const { ref, render, autoDismiss = true, placement = "auto" } = options
  const [name] = useState(() => String(getUniqueId()))

  const { popoverStore } = useStores()
  const [popoverName, setPopoverName] = useState("")

  const spawn = () => {
    const { current: anchor } = ref
    if (!anchor || popoverName) return

    popoverStore.spawn({
      onDismiss: () => setPopoverName(""),
      autoDismiss,
      placement,
      render,
      anchor,
      name,
    })

    setPopoverName(name)
  }

  const dismiss = useCallback(() => {
    if (popoverName) {
      popoverStore.dismiss(popoverName)
      setPopoverName("")
    }
  }, [popoverName, popoverStore])

  const toggle = () => {
    if (!popoverName) {
      spawn()
    } else {
      dismiss()
    }
  }

  useEffect(() => {
    if (popoverName) {
      popoverStore.update(popoverName, { render })
    }
  }, [render, popoverStore, popoverName])

  useEffect(() => {
    return () => {
      dismiss()
    }
  }, [dismiss])

  return {
    active: !!popoverName,
    dismiss,
    toggle,
    spawn,
  }
}
