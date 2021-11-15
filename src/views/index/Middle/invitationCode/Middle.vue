<template>
    <div class="invitation-code">
        <div class="title">
            <div class="desc">
                You have {{ invitationCodes.length }} invites, one time use each.
            </div>
            <div class="indicator">
                <span class="current">
                    {{ invitationCodes.filter(x => !x.used).length }}
                </span> / {{ invitationCodes.length }}
            </div>
        </div>
        <div class="codes">
            <div v-for="item in invitationCodes" :key="item.code" class="code" :class="{
                used: item.used,
            }">
                <div class="code-text">
                    Invitation code
                </div>
                <div class="code-content">
                    {{ item.code }}
                </div>
                <div class="code-copy-icon" v-clipboard:copy="item.code" v-clipboard:success="() => $message.info('Copied')" />
                <div class="code-image" />
            </div>
        </div>
    </div>
</template>

<script>
import { getInviteCodes } from '@/api/user'
export default {
    data() {
        return {
            invitationCodes: [],
        }
    },
    mounted() {
        this.loadInvitationCodes()
    },
    methods: {
        loadInvitationCodes() {
            getInviteCodes().then((codes) => {
                this.invitationCodes = codes.map(x => ({
                    code: x.code,
                    used: x.status === 1,
                }))
            })
        },
    }
}
</script>

<style lang="less" scoped>
.invitation-code {
    padding: 20px;
    height: 500px;
    border-radius: 4px;
    background: #1F1F1F;

    .title {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #898989;

        .current {
            color: #FFFFFF;
        }
    }

    .codes {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .code {
            margin-top: 20px;
            width: 277px;
            height: 67px;
            position: relative;
            background: #161616;

            &.used {
                opacity: 0.5;
            }

            .code-text {
                position: absolute;
                left: 20px;
                top: 13px;
                background: linear-gradient(250deg, #B6EEFF 0%, #FFFAD9 41%, #E1CDE6 69%, #719BFF 100%);
                font-size: 10px;
                font-weight: 400;
                line-height: 16px;
                color: #D4D4D4;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .code-content {
                position: absolute;
                left: 20px;
                top: 32px;
                font-size: 16px;
                font-weight: 400;
                line-height: 25px;
                letter-spacing: 3px;
                color: #FFFFFF;
            }

            .code-copy-icon {
                width: 12px;
                height: 12px;
                position: absolute;
                left: 115px;
                top: 37px;
                background: url(../../../../assets/icons/invitation_code/copy.png) center/contain no-repeat;
                cursor: pointer;
            }

            .code-image {
                width: 45px;
                height: 45px;
                position: absolute;
                right: 20px;
                top: 11px;
                background: url(../../../../assets/images/invitation_code/invitation_code.png) center/contain no-repeat;
            }
        }
    }
}
</style>