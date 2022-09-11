@props([
    'apiKey' => config('services.google_maps_api_key'),
    'zoom' => 10
])

<div 
    x-data="googleMaps({
        zoom: {{ json_encode($zoom) }},
        apiKey: '{{ $apiKey }}'
    })"
    {{ $attributes->merge(['class' => 'googleMaps']) }}
>
    {!! $slot !!}
</div>

@once
    @push('head')
        <link rel="stylesheet" href="{{ asset('../vendor/humble-guys/humble-google-maps-component/public/resources/dist/style.css?v=0.0.2') }}">
        <script module defer src="{{ asset('../vendor/humble-guys/humble-google-maps-component/public/resources/dist/humble-google-maps-component.umd.js?v=0.0.2') }}"></script>
    @endpush
@endonce 