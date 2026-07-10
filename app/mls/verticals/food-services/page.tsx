import { redirect } from 'next/navigation'

// The food-services page is served as the restored static HTML page
// (public/food-services.html) copied verbatim from the old
// sandstone_mlswebsite repo, together with its media under
// public/assets, public/vyanjanam and public/MLS_SVG.
export default function FoodServicesPage() {
  redirect('/food-services.html')
}
