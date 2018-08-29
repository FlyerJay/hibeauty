<template>
  <div class="crypto">

  </div>
</template>
<script>
import cryptoJs from 'crypto-js';
import Crypto from 'crypto';
import createHash from 'create-hash/browser';
export default {
  data() {
    return {

    };
  },

  beforeMount() {
    // cryptoJs.HmacSHA1(cryptoJs.HmacSHA1('o9xla1aff5jwcqc4qhg3clal2bu3d5hk', ''), '').toString();
    const key = this.SHA1PRNG('o9xla1aff5jwcqc4qhg3clal2bu3d5hk');
    console.log(key);
    console.log(cryptoJs.AES.encrypt('hello', key, {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7,
      iv: ''
    }).toString());

    const algorithm = 'aes-128-ecb';
    const clearEncoding = 'utf8';
    const iv = '';
    const cipherEncoding = 'base64';

    // aes 加密
    function aesEncrypt(text) {
      text = JSON.stringify(text);
      const cipher = Crypto.createCipheriv(algorithm, key, iv);
      const cipherChunks = [];
      cipher.setAutoPadding(true);
      cipherChunks.push(cipher.update(text, clearEncoding, cipherEncoding));
      cipherChunks.push(cipher.final(cipherEncoding));
      console.info(cipherEncoding + ' 密文: ' + cipherChunks.join(''));
      return { data: cipherChunks.join('').toUpperCase() };
    }
    aesEncrypt('hello');
  },

  methods: {
    SHA1PRNG(seed) {
      let sha = createHash('sha1'),
        btLength = 16,
        bt = new Buffer(btLength),
        index = 0,
        DIGEST_SIZE = 20,
        output = '',
        remCount = 0;
      sha.update(seed);
      let state = sha.digest();
      

      while (index < btLength) {
        sha = createHash('sha1');
        sha.update(state);
        output = sha.digest();
        state = this.updateState(state, output);
        const todo = (btLength - index) > DIGEST_SIZE ? DIGEST_SIZE : btLength - index;
        for (let i = 0; i < todo; i++) {
          bt[index++] = output[i];
          output[i] = 0;
        }
        remCount += todo;
      }

      // Store remainder for next time
      const remainder = output;
      remCount %= DIGEST_SIZE;
      return bt;
    },

    updateState(state, output) {
      let last = 1;
      let v = 0;
      let t = 0;
      let zf = false;
      // state(n + 1) = (state(n) + output(n) + 1) % 2^160;
      for (let i = 0; i < state.length; i++) {
        // Add two bytes
        v = this.getInt8(state[i]) + this.getInt8(output[i]) + last;
        // Result is lower 8 bits
        t = v & 255;
        // Store result. Check for state collision.
        zf = zf | (state[i] != t);
        state[i] = t;
        // High 8 bits are carry. Store for next iteration.
        t = v >> 8;
      }

      // Make sure at least one bit changes!
      if (!zf) {
        state[0]++;
      }
      return state;
    },

    getInt8(num) {
      // if (num > 127) {
      //   return num - 256;
      // }
      return num;
    }
  }
};
</script>
<style lang="less" scoped>

</style>


