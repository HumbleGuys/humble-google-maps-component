<x-layout>
    <div style="height: 80rem; width: 150rem; margin:auto; max-width:100%; position:relative">
        <x-googleMaps::base 
            map-style="lightGray"
        >
            <x-googleMaps::marker
                :lat="56.210120"
                :lng="15.278090"
                :icon="asset('assets/map-pin.svg')"
                :icon-width="48"
                :icon-height="48"
            >
                <x-googleMaps::infoWindow>
                    <div style="padding:1rem;font-size:2rem">
                        Min info window
                    </div>
                </x-googleMaps::infoWindow>
            </x-googleMaps::marker>

            <x-googleMaps::marker
                :lat="56.200990"
                :lng="15.281890"
                :icon="asset('assets/map-pin-blue.svg')"
                :icon-width="72"
                :icon-height="72"
            >
                <x-googleMaps::infoWindow>
                    Min andra info window
                </x-googleMaps::infoWindow>
            </x-googleMaps::marker>

            <x-googleMaps::marker
                :lat="56.300990"
                :lng="15.381890"
                :icon="asset('assets/map-pin-red.svg')"
                :icon-width="96"
                :icon-height="96"
            >
                <x-googleMaps::infoWindow>
                    Min tredje info window
                </x-googleMaps::infoWindow>
            </x-googleMaps::marker>
        </x-googleMaps::base>
    </div>
</x-layout>