import prisma from '@/app/libs/prismadb'

export default async function getListing(){
    try {
        const listing = await prisma.listings.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListings = listing.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
          }));

          return safeListings;
    } catch (error: any) {
        throw new Error(error)
    }
}