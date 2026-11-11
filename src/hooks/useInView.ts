import { useRef } from "react"
import { useInView as useFramerInView } from "framer-motion"

export function useInView(amount = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useFramerInView(ref, { once: true, amount })
  return { ref, isInView }
}
