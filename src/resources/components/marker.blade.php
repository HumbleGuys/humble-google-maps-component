@props([
    'lat',
    'lng',
    'icon' => null,
    'iconWidth' => 24,
    'iconHeight' => 24,
])

<div
    class="googleMaps__marker"
    data-lat="{{ $lat }}"
    data-lng="{{ $lng }}"
    data-icon="{{ $icon }}"
    data-icon-width="{{ $iconWidth }}"
    data-icon-height="{{ $iconHeight }}"
    style="display:none"
>
    {!! $slot !!}
</div>