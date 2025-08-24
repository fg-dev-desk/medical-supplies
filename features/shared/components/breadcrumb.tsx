import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link href="/" className="flex items-center text-green-600 hover:text-green-700">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      {items.slice(1).map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link href={item.href} className="text-gray-600 hover:text-green-600">
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  )
}
