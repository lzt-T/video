import argparse
from pathlib import Path

import soundfile as sf
import torch
from qwen_tts import Qwen3TTSModel


MODEL_ID = "Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice"
DEFAULT_SPEAKER = "Serena"
DEFAULT_LANGUAGE = "Chinese"


def parse_arguments() -> argparse.Namespace:
    """Parse the text-to-speech command arguments."""
    parser = argparse.ArgumentParser(description="Generate speech with Qwen3-TTS.")
    parser.add_argument("--text", required=True, help="Text to synthesize.")
    parser.add_argument("--output", required=True, help="Output WAV path.")
    parser.add_argument("--speaker", default=DEFAULT_SPEAKER, help="Qwen preset speaker.")
    parser.add_argument("--language", default=DEFAULT_LANGUAGE, help="Speech language.")
    return parser.parse_args()


def validate_cuda() -> None:
    """Verify that the active PyTorch build can execute on the local GPU."""
    if not torch.cuda.is_available():
        raise RuntimeError("CUDA is unavailable. Install the CUDA 13 PyTorch build in myenv.")

    torch.zeros(1, device="cuda")


def generate_speech(arguments: argparse.Namespace) -> None:
    """Generate one WAV file with the configured local Qwen model."""
    validate_cuda()
    output_path = Path(arguments.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    model = Qwen3TTSModel.from_pretrained(
        MODEL_ID,
        device_map="cuda:0",
        dtype=torch.bfloat16,
        attn_implementation="sdpa",
    )
    waveforms, sample_rate = model.generate_custom_voice(
        text=arguments.text,
        language=arguments.language,
        speaker=arguments.speaker,
    )
    sf.write(output_path, waveforms[0], sample_rate)


def main() -> None:
    """Run local speech generation from the command line."""
    arguments = parse_arguments()
    generate_speech(arguments)


if __name__ == "__main__":
    main()
