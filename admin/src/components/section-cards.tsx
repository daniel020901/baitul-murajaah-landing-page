"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Penjualan Bookstore</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp 18.450.000
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Meningkat bulan ini <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Transaksi kitab & mushaf 30 hari terakhir
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Santri & Peserta Dauroh</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            470
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Pendaftaran stabil <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Murojaah Camp & Dauroh Pekanan
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Artikel & Warta</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            24
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              +4 baru
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Publikasi rutin aktif <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Warta Santri, Sanad & Majelis</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pesanan Diproses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            18
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon />
              -2 pending
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Pengiriman tepat waktu <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Menunggu konfirmasi kurir</div>
        </CardFooter>
      </Card>
    </div>
  )
}
