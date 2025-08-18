import { useEffect, useState } from "react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300) // show after 300px
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      className={`back-to-top ${visible ? "show" : ""}`}
      onClick={scrollTop}
      aria-label="Back to top"
    >
      ⬆
    </button>
  )
}
