import { ScrollTrigger, ScrollTriggerProps } from "src/modules/ui/components/ScrollTrigger"
import { List } from "../classes/List"
import { useObserver } from "../hooks/useObserver"

export type ListTailProps = {
  list?: List<any, any>
} & Omit<ScrollTriggerProps, "onTrigger">

export function ListTail(props: ListTailProps) {
  const { list, ...rest } = props

  if (!list) return null

  const { status, hasMore } = useObserver(() => ({
    status: list.status,
    hasMore: list.hasMore,
  }))

  const handleTrigger = async () => {
    if (status === "idle" && hasMore) {
      await list.more()
    }
  }

  return <ScrollTrigger onTrigger={handleTrigger} {...rest} />
}
