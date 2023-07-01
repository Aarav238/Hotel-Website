import getListing from "./actions/getListingUsers";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ClientOnly from "./components/navbar/ClientOnly";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";


export default async function Home() {
  const  listing = await getListing();
  const currentUser = await getCurrentUser();
  if (listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div
        className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        "
        >

      {listing.map((listing) => {
        return (
          <ListingCard 
          currentUser={currentUser}
          key={listing.id}
          data={listing}
          />
        )
      })}

        </div>
      </Container>
    </ClientOnly>
  )
}
