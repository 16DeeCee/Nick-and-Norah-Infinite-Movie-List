import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="border-b">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <h1 className="text-2xl font-bold">NaN's Infinite Movie List</h1>
              
                <Button asChild variant="ghost" className="text-sm">
                    <Link to="/">Home</Link>
                </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search a movie" className="pl-10 w-full" />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;