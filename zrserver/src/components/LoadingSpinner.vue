<template>
    <div class="loading-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="loading-svg">
            <circle fill="#F2A900" stroke="#F2A900" stroke-width="15" r="15" cx="40" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" />
            </circle>
            <circle fill="#F2A900" stroke="#F2A900" stroke-width="15" r="15" cx="100" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" />
            </circle>
            <circle fill="#F2A900" stroke="#F2A900" stroke-width="15" r="15" cx="160" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0" />
            </circle>
        </svg>
    </div>
</template>

<style scoped>
.loading-overlay {
    position: fixed;
    /* cobre a tela toda */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    /* fundo escuro translúcido */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-svg {
    width: 120px;
    height: 120px;
}
</style>
