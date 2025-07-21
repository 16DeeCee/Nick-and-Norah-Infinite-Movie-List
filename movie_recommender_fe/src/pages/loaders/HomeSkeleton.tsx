import { Skeleton } from "@/components/ui/skeleton";

function HomeSkeleton () {
  return (
    <div className="relative bg-gradient-to-r from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 space-y-6 max-w-3xl">
        <Skeleton className="h-20 w-[250px]" />
        <Skeleton className="h-20 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-20 w-[100px] rounded-md" />
          <Skeleton className="h-20 w-[100px] rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default HomeSkeleton;