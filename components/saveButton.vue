<template>
    <button @click="handleClick" class="save-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path
                d="M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-7H8V6h7v6z" />
        </svg>
        Save
    </button>
</template>

<script>
export default {
    name: 'SaveButton',
    methods: {
        handleClick() {
            this.$emit('save');
        }
    }
}
</script>

<style scoped>
.save-button {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.save-button svg {
    margin-right: 8px;
}

.save-button:hover {
    background-color: #45a049;
}
</style></svg></template>