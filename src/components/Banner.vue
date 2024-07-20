<template>
    <div class="banner">
        <div class="banner-content">
            <h2 class="primary-gradient">NEW COLLECTION !</h2>
            <h1>
                <span class="primary-white">SNEAKER</span>
                <span class="primary-peach"> GANG</span>
            </h1>
            <p class="primary-white b2">
                Sport keeps us fit. Keeps you mindful. Brings us together.
                Through sport we have the power to change lives. Whether it is
                through stories of inspiring athletes.
            </p>
            <AddProductButton />
        </div>
        <div class="banner-image">
            <img src="../assets/images/shoes.png" alt="Sneaker Image" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AddProductButton from './AddProductButton.vue';
</script>

<style lang="scss" scoped>
.banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(20, 20, 20, 0.9);
    padding: 20px;
    color: #fff;
    border-radius: 0.5rem;
    overflow: visible;

    .banner-content {
        z-index: 1;
        max-width: 65%;
    }

    .banner-image {
        position: absolute;
        top: -6.5rem;
        right: 1.5rem;
        bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        overflow: visible;
        z-index: 0;

        img {
            max-height: 100%;
            object-fit: cover;
        }
    }
}

@media all and (max-width: 767.9px) {
    .banner {
        padding: 14rem 1.25rem 1.25rem 1.25rem;
        margin-top: 6rem;
        position: static;
        display: block;

        .banner-content {
            max-width: 100%;
        }

        .banner-image {
            position: absolute;
            top: 5rem;
            right: 0;
            text-align: center;
            overflow: visible;
            z-index: 0;
            height: fit-content;
            justify-content: center;

            img {
                width: 65%;
            }
        }
    }
}

@media all and (min-width: 768px) and (max-width: 991.9px) {
    .banner {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.5);
        padding: 20px;
        color: #fff;
        border-radius: 0.5rem;
        overflow: visible;
        padding: 1.25rem 1.25rem 1.25rem 1.25rem;
        margin-top: 0rem;
        .banner-content {
            z-index: 1;
            max-width: 65%;
        }

        .banner-image {
            position: absolute;
            top: -8rem;
            right: 1.5rem;
            bottom: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            overflow: visible;
            z-index: 0;

            img {
                width: 65%;
            }
        }
    }
}

@media all and (min-width: 992px) and (max-width: 1023.9px){
    .banner {
        .banner-content {
            max-width: 100%;
        }
    }
}

@media only screen and (min-width: 1024px) and (max-width: 1279.9px) {
    .banner {
        .banner-content {
            max-width: 100%;
        }
            .banner-image {
                position: absolute;
                // top: -8rem;
                // right: 1.5rem;
                // bottom: 3.5rem;
                top: -4.5rem;
                right: 2.5rem;
                bottom: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                overflow: visible;
                z-index: 0;

                img {
                    width: 65%;
                }
            }
    }
}
</style>
