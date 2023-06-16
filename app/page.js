import Link from 'next/link'

export default function Home() {
  return (
    <div>
      홈페이지
      <Link href={"/product"}>상품목록</Link>
    </div>
  )
}
